/**
 * WeDevUp WhatsApp AI Agent — Multi-Tenant Service
 *
 * Receives webhooks from Evolution API, routes to correct client config,
 * generates AI response, sends back via Evolution API.
 */

import express from 'express';
import { configStore } from './config-store.js';
import { createChatHandler } from './chat-handler.js';
import { createEvolutionClient } from './evolution-client.js';
import { createLogger } from './logger.js';
import 'dotenv/config';

const log = createLogger('server');
const app = express();
app.use(express.json());

const evolution = createEvolutionClient({
  baseUrl: process.env.EVOLUTION_API_URL || 'http://localhost:8080',
  apiKey: process.env.EVOLUTION_API_KEY || '',
});

// Load all client configs
const configs = configStore(process.env.CONFIGS_DIR || '../configs');
const chatHandler = createChatHandler({ configs, evolution });

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    clients: configs.list().map(c => c.clientId),
    uptime: process.uptime(),
  });
});

// Evolution API webhook — receives incoming messages
app.post('/webhook/:instanceName', async (req, res) => {
  try {
    const { instanceName } = req.params;
    const event = req.body;

    // Evolution API sends various event types; we care about messages
    if (event.event !== 'messages.upsert') {
      return res.sendStatus(200);
    }

    const message = event.data;

    // Skip outgoing messages, status updates, group messages (for now)
    if (message.key?.fromMe) return res.sendStatus(200);
    if (message.key?.remoteJid?.endsWith('@g.us')) return res.sendStatus(200);
    if (message.key?.remoteJid?.endsWith('@broadcast')) return res.sendStatus(200);

    // Extract text content
    const text =
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      '';

    if (!text.trim()) return res.sendStatus(200);

    const senderJid = message.key.remoteJid;
    const senderPhone = senderJid.replace('@s.whatsapp.net', '');

    log.info({ instanceName, senderPhone, text: text.substring(0, 100) }, 'Incoming message');

    // Process asynchronously so webhook returns fast
    res.sendStatus(200);

    await chatHandler.handle({
      instanceName,
      senderJid,
      senderPhone,
      text,
      messageId: message.key.id,
    });
  } catch (err) {
    log.error({ err }, 'Webhook error');
    res.sendStatus(500);
  }
});

// List clients (admin)
app.get('/admin/clients', (_req, res) => {
  res.json(configs.list().map(c => ({
    clientId: c.clientId,
    businessName: c.businessName,
    businessType: c.businessType,
  })));
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  log.info({ port: PORT, clients: configs.list().length }, 'Agent service started');
});
