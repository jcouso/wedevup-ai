/**
 * Evolution API Client — sends messages back to WhatsApp.
 */

import { createLogger } from './logger.js';

const log = createLogger('evolution');

export function createEvolutionClient({ baseUrl, apiKey }) {
  async function sendText(instanceName, jid, text) {
    const url = `${baseUrl}/message/sendText/${instanceName}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
        },
        body: JSON.stringify({
          number: jid.replace('@s.whatsapp.net', ''),
          text,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        log.error({ instanceName, status: res.status, body }, 'Failed to send message');
        return false;
      }

      log.info({ instanceName, jid: jid.substring(0, 8) + '...' }, 'Message sent');
      return true;
    } catch (err) {
      log.error({ err, instanceName }, 'Evolution API request failed');
      return false;
    }
  }

  async function getInstanceStatus(instanceName) {
    const url = `${baseUrl}/instance/connectionState/${instanceName}`;
    try {
      const res = await fetch(url, {
        headers: { 'apikey': apiKey },
      });
      return await res.json();
    } catch (err) {
      log.error({ err }, 'Failed to get instance status');
      return null;
    }
  }

  return { sendText, getInstanceStatus };
}
