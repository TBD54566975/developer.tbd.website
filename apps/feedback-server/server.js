require('dotenv').config();

const express = require('express');

const { doubleCsrf } = require('csrf-csrf');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { db } = require('./db');

const config = {
  devMode: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  port: process.env.PORT || 3001,
  serverSecret: process.env.SERVER_SECRET,
  serverAllowedOrigins: (process.env.SERVER_ALLOWED_ORIGINS || '').split(','),
};

console.info('Server secret:', {
  ...config,
  serverSecret: '***',
});

// Init express app
const app = express();

// Init CORS with options
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = config.serverAllowedOrigins;
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Oops! Not allowed by CORS'));
    }
  },
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
  cookieName: `${config.devMode ? 'dev' : '__Host'}-psifi.x-csrf-token`,
  cookieOptions: {
    sameSite: 'none',
    path: '/',
    secure: !config.devMode,
  },
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
};
const { generateToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

app.get('/api/csrf-token', (req, res) => {
  const csrfToken = generateToken(req, res);
  res.json({ csrfToken });
});

app.use(doubleCsrfProtection);

app.post('/api/feedback', async (req, res) => {
  console.log('Received request:', req.body);
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
    console.log('Sending response...');
    res.json({ success: true });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing the feedback',
    });
  }
});

db.initDb().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
});
