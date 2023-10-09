import express from 'express';

import { doubleCsrf } from 'csrf-csrf';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { logger, httpLogger } from './logger.js';
import { db } from './db.js';
import { config } from './config.js';

logger.info('Server config: %o', {
  ...config,
  serverSecret: '***',
});

// Init express app
export const app = express();
app.use(httpLogger);

// Init CORS with options
const corsOptions = {
  origin: config.serverAllowedOrigins,
  methods: 'GET,POST',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Setup CSRF Config
const doubleCsrfOptions = {
  getSecret: () => config.serverSecret,
  cookieName: `${config.devMode ? 'dev' : '__Host'}-tbd.x-csrf-token`,
  cookieOptions: {
    sameSite: 'none',
    path: '/',
    secure: true,
  },
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
};
const { generateToken, doubleCsrfProtection, invalidCsrfTokenError } =
  doubleCsrf(doubleCsrfOptions);

app.get('/api/csrf-token', (req, res) => {
  const csrfToken = generateToken(req, res);
  res.json({ csrfToken });
});

app.use(doubleCsrfProtection);

app.post('/api/feedback', async (req, res) => {
  req.log.info('Received request: %o', req.body);
  const { rating, pageLink } = req.body;

  if (!rating || !pageLink) {
    res.status(400).json({ message: 'Missing rating or pageLink' });
    return;
  } else if (rating !== 'helpful' && rating !== 'notHelpful') {
    res.status(400).json({ message: 'Invalid rating' });
    return;
  }

  try {
    // helpful = Y, notHelpful = N
    const voteValue = rating === 'helpful' ? 'Y' : 'N';
    await db.storeVote(pageLink, voteValue);
    req.log.info('Vote accepted!');
    res.json({ success: true });
  } catch (error) {
    req.log.error('Error occurred: %s\nStack=%s', error, error.stack);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing the feedback',
    });
  }
});

if (config.testMode) {
  app.get('/fake-error', (req, res) => {
    throw new Error('fake error!');
  });
}

app.use((error, req, res, next) => {
  if (error == invalidCsrfTokenError) {
    req.log.error('Invalid CSRF Token Error');
    res.status(403).json({
      error: 'csrf validation error',
    });
  } else {
    req.log.error('SERVER ERROR\nStack=%s', error.stack);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

db.initDb().then(() => {
  app.listen(config.port, () => {
    logger.info(`Server running at http://localhost:${config.port}`);
  });
});
