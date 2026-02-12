/**
 * Config Store — loads and indexes client configs from JSON files.
 * Each .json file in the configs directory = one client.
 */

import { readdirSync, readFileSync, watchFile } from 'node:fs';
import { join, basename } from 'node:path';
import { createLogger } from './logger.js';

const log = createLogger('config-store');

export function configStore(configsDir) {
  const configs = new Map(); // clientId -> config
  const byInstance = new Map(); // evolution instanceName -> config

  function loadAll() {
    const files = readdirSync(configsDir).filter(f => f.endsWith('.json') && f !== 'template.json');

    for (const file of files) {
      try {
        const raw = readFileSync(join(configsDir, file), 'utf-8');
        const config = JSON.parse(raw);

        if (!config.clientId) {
          log.warn({ file }, 'Config missing clientId, skipping');
          continue;
        }

        // Interpolate {businessName} in templates
        const interpolated = interpolateConfig(config);
        configs.set(interpolated.clientId, interpolated);

        // Map Evolution API instance name to config
        // Convention: instance name = clientId
        byInstance.set(interpolated.clientId, interpolated);

        log.info({ clientId: interpolated.clientId, business: interpolated.businessName }, 'Loaded config');
      } catch (err) {
        log.error({ file, err: err.message }, 'Failed to load config');
      }
    }

    log.info({ count: configs.size }, 'All configs loaded');
  }

  function interpolateConfig(config) {
    const json = JSON.stringify(config);
    const interpolated = json.replace(/\{businessName\}/g, config.businessName || '');
    return JSON.parse(interpolated);
  }

  function getByInstance(instanceName) {
    return byInstance.get(instanceName) || null;
  }

  function getById(clientId) {
    return configs.get(clientId) || null;
  }

  function list() {
    return Array.from(configs.values());
  }

  loadAll();

  return { getByInstance, getById, list, reload: loadAll };
}
