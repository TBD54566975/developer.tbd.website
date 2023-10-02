const { Pool: DbPool } = require('pg');

const dbConfig = {
  address: process.env.DB_CONNECTION,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};

/** PostgresDb */
class PostgresDb {
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
    await this.dbPool.query(`
        CREATE TABLE IF NOT EXISTS feedback_votes (
          id SERIAL PRIMARY KEY,
          url VARCHAR(255) NOT NULL,
          vote CHAR NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
  }

  async storeVote(url, vote) {
    // insert vote into feedback_votes table
    await this.dbPool.query(
      'INSERT INTO feedback_votes (url, vote) VALUES ($1, $2);',
      [url, vote],
    );
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
    console.info('>>> (Mocked) Inserted vote:', { url, vote });
    console.info('>>> Total votes:', this.votes.length);
  }
}

let db;

if (dbConfig.address) {
  console.info('>>> Using Postgres DB', { ...dbConfig, password: '***' });
  db = new PostgresDb(dbConfig);
} else {
  console.info('>>> Using FakeDB');
  db = new FakeDb();
}

module.exports = { db };
