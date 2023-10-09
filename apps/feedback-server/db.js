import pg from 'pg';
const DbPool = pg.Pool;

import { logger } from './logger.js';
import { dbConfig } from './config.js';

/** PostgresDb */
class PostgresDb {
  INIT_QUERY = `
    CREATE TABLE IF NOT EXISTS feedback_votes (
      id SERIAL PRIMARY KEY,
      url VARCHAR(255) NOT NULL,
      vote CHAR NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;

  VOTE_QUERY = 'INSERT INTO feedback_votes (url, vote) VALUES ($1, $2);';

  constructor(dbConfig) {
    this.dbPool = new DbPool({
      host: dbConfig.address,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
      database: dbConfig.database,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  async initDb() {
    await this.dbPool.query(this.INIT_QUERY);
  }

  async storeVote(url, vote) {
    // insert vote into feedback_votes table
    await this.dbPool.query(this.VOTE_QUERY, [url, vote]);
  }
}

/** FakeDb for testing purposes only on dev */
class FakeDb {
  constructor() {
    this.votes = [];
  }

  async initDb() {
    // do nothing
  }

  async storeVote(url, vote) {
    this.votes.push({ url, vote });
    logger.info('>>> (Mocked) Inserted vote: %o', { url, vote });
    logger.info('>>> Total votes: %d', this.votes.length);
  }
}

let db;

if (dbConfig.address) {
  logger.info('>>> Using Postgres DB %o', { ...dbConfig, password: '***' });
  db = new PostgresDb(dbConfig);
} else {
  logger.info('>>> Using FakeDB');
  db = new FakeDb();
}

export { db, PostgresDb, FakeDb };
