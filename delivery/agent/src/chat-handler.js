/**
 * Chat Handler — processes incoming messages, manages conversation history,
 * generates AI responses, handles escalation and business hours.
 */

import OpenAI from 'openai';
import { createConversationDB } from './conversation-db.js';
import { createLogger } from './logger.js';
import 'dotenv/config';

const log = createLogger('chat-handler');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export function createChatHandler({ configs, evolution }) {
  const dbDir = process.env.DB_DIR || './data';
  const conversationDB = createConversationDB(dbDir);

  async function handle({ instanceName, senderJid, senderPhone, text, messageId }) {
    const config = configs.getByInstance(instanceName);

    if (!config) {
      log.warn({ instanceName }, 'No config found for instance');
      return;
    }

    // Check business hours
    if (!isWithinBusinessHours(config)) {
      log.info({ clientId: config.clientId, senderPhone }, 'Outside business hours');
      await evolution.sendText(instanceName, senderJid, config.offHoursMessage);
      return;
    }

    // Get conversation history
    const history = conversationDB.getHistory(config.clientId, senderPhone, config.ai.maxHistoryMessages);

    // Save incoming message
    conversationDB.addMessage(config.clientId, senderPhone, 'user', text);

    // Build messages for OpenAI
    const messages = buildMessages(config, history, text);

    try {
      const completion = await openai.chat.completions.create({
        model: config.ai.model || 'gpt-4o-mini',
        messages,
        max_tokens: config.ai.maxTokens || 500,
        temperature: config.ai.temperature || 0.7,
      });

      const reply = completion.choices[0]?.message?.content || '';

      if (!reply) {
        log.warn({ clientId: config.clientId }, 'Empty AI response');
        return;
      }

      // Check for escalation triggers
      if (shouldEscalate(config, text, reply, history.length)) {
        await handleEscalation(config, instanceName, senderJid, senderPhone, text);
        return;
      }

      // Save and send response
      conversationDB.addMessage(config.clientId, senderPhone, 'assistant', reply);
      await evolution.sendText(instanceName, senderJid, reply);

      // Capture lead data if enabled
      if (config.leadCapture?.enabled) {
        await captureLead(config, senderPhone, text, reply);
      }

      log.info({
        clientId: config.clientId,
        senderPhone,
        tokens: completion.usage?.total_tokens,
      }, 'Response sent');

    } catch (err) {
      log.error({ err, clientId: config.clientId }, 'AI completion failed');
      // Graceful fallback
      await evolution.sendText(
        instanceName,
        senderJid,
        'Desculpe, estou com uma dificuldade técnica no momento. Nossa equipe vai entrar em contato em breve! 🙏'
      );
    }
  }

  function buildMessages(config, history, currentText) {
    const systemMessage = buildSystemPrompt(config);
    const messages = [{ role: 'system', content: systemMessage }];

    // Add conversation history
    for (const msg of history) {
      messages.push({ role: msg.role, content: msg.content });
    }

    // Add current message
    messages.push({ role: 'user', content: currentText });
    return messages;
  }

  function buildSystemPrompt(config) {
    let prompt = config.systemPrompt + '\n\n';

    // Add services
    if (config.services?.length) {
      prompt += '## Serviços Disponíveis\n';
      for (const svc of config.services) {
        prompt += `- **${svc.name}**: ${svc.description}. Preço: ${svc.price}. Duração: ${svc.duration}.\n`;
      }
      prompt += '\n';
    }

    // Add FAQs
    if (config.faqs?.length) {
      prompt += '## Perguntas Frequentes\n';
      for (const faq of config.faqs) {
        prompt += `P: ${faq.question}\nR: ${faq.answer}\n\n`;
      }
    }

    // Add booking instructions
    if (config.appointmentBooking?.enabled) {
      prompt += '## Agendamento\nVocê pode agendar atendimentos. Colete as seguintes informações: ';
      prompt += config.appointmentBooking.collectFields.join(', ') + '.\n';
      prompt += 'Após coletar tudo, confirme com o cliente usando uma mensagem amigável.\n\n';
    }

    // Add compliance
    if (config.compliance?.blockedTopics?.length) {
      prompt += '## Restrições\nNUNCA fale sobre: ' + config.compliance.blockedTopics.join(', ') + '.\n';
      prompt += 'Se perguntarem sobre esses assuntos, redirecione para consulta presencial.\n';
    }

    return prompt;
  }

  function isWithinBusinessHours(config) {
    const now = new Date();
    // Convert to client timezone
    const options = { timeZone: config.timezone || 'America/Sao_Paulo', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);

    const weekday = parts.find(p => p.type === 'weekday')?.value?.toLowerCase();
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    const currentTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    const dayHours = config.businessHours?.[weekday];
    if (!dayHours) return false; // Closed on this day

    return currentTime >= dayHours.open && currentTime <= dayHours.close;
  }

  function shouldEscalate(config, userText, aiReply, historyLength) {
    if (!config.escalation?.triggers) return false;

    const combined = (userText + ' ' + aiReply).toLowerCase();
    for (const trigger of config.escalation.triggers) {
      if (combined.includes(trigger.toLowerCase())) return true;
    }

    // Escalate after too many exchanges without resolution
    if (historyLength > 6) return true;

    return false;
  }

  async function handleEscalation(config, instanceName, senderJid, senderPhone, lastMessage) {
    log.info({ clientId: config.clientId, senderPhone }, 'Escalating to human');

    // Notify client
    await evolution.sendText(instanceName, senderJid, config.escalation.message);

    // Notify team (if configured)
    if (config.escalation.notifyNumber) {
      const teamJid = config.escalation.notifyNumber + '@s.whatsapp.net';
      await evolution.sendText(instanceName, teamJid,
        `🔔 Atendimento escalado!\nCliente: ${senderPhone}\nÚltima mensagem: ${lastMessage}`
      );
    }
  }

  async function captureLead(config, phone, message, reply) {
    // Simple lead capture — store locally
    conversationDB.addLead(config.clientId, phone, message);
  }

  return { handle };
}
