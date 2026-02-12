/**
 * Conversation DB — SQLite storage for chat history and leads.
 * One DB file per client for isolation.
 */

import Database from 'better-sqlite3';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { createLogger } from './logger.js';

const log = createLogger('db');

export function createConversationDB(dbDir) {
  mkdirSync(dbDir, { recursive: true });
  const dbs = new Map();

  function getDB(clientId) {
    if (dbs.has(clientId)) return dbs.get(clientId);

    const dbPath = join(dbDir, `${clientId}.db`);
    const db = new Database(dbPath);

    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT NOT NULL,
        first_message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(phone)
      );

      CREATE INDEX IF NOT EXISTS idx_messages_phone ON messages(phone, created_at);
    `);

    dbs.set(clientId, db);
    log.info({ clientId, dbPath }, 'DB initialized');
    return db;
  }

  function addMessage(clientId, phone, role, content) {
    const db = getDB(clientId);
    db.prepare('INSERT INTO messages (phone, role, content) VALUES (?, ?, ?)').run(phone, role, content);
  }

  function getHistory(clientId, phone, limit = 20) {
    const db = getDB(clientId);
    return db
      .prepare('SELECT role, content FROM messages WHERE phone = ? ORDER BY created_at DESC LIMIT ?')
      .all(phone, limit)
      .reverse(); // Chronological order
  }

  function addLead(clientId, phone, firstMessage) {
    const db = getDB(clientId);
    db.prepare('INSERT OR IGNORE INTO leads (phone, first_message) VALUES (?, ?)').run(phone, firstMessage);
  }

  function getLeads(clientId) {
    const db = getDB(clientId);
    return db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
  }

  return { addMessage, getHistory, addLead, getLeads };
}
