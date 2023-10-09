import dotenv from 'dotenv';
dotenv.config();

export const config = {
  devMode: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  testMode: process.env.NODE_ENV === 'test',
  port: process.env.PORT || 3001,
  serverSecret: process.env.SERVER_SECRET,
  serverAllowedOrigins: (process.env.SERVER_ALLOWED_ORIGINS || '').split(','),
};

export const dbConfig = {
  address: process.env.DB_CONNECTION,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
};
