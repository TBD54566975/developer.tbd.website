require('dotenv').config();

const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Pool: DbPool } = require('pg');

const config = {
  port: process.env.PORT || 3001,
  serverSecret: process.env.SERVER_SECRET,
  serverAllowedOrigins: (process.env.SERVER_ALLOWED_ORIGINS || '').split(','),
  db: {
    address: process.env.DB_ADDRESS,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
};

console.info('Server secret:', {
  ...config,
  serverSecret: '***',
});

const dbPool = new DbPool({
  host: config.db.address,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port,
  database: config.db.database,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const initDb = async () => {
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS feedback_votes (
      id SERIAL PRIMARY KEY,
      url VARCHAR(255) NOT NULL,
      vote TINYINT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

const storeVote = async (url, vote) => {
  // insert vote into feedback_votes table
  const res = await dbPool.query(
    'INSERT INTO feedback_votes (url, vote) VALUES ($1, $2);',
    [url, vote],
  );
  console.info('>>> Inserted vote:', res.rows);
};

// Init express app
const app = express();

// Init session
app.use(
  session({
    secret: config.serverSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: 'Strict' },
  }),
);

// Init CORS with options
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = config.serverAllowedOrigins;
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Oops! Not allowed by CORS, I am so sorry :( hehehe'));
    }
  },
  methods: 'GET,POST',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken });
});

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
    // helpful = 1, notHelpful = -1, noVote = 0
    const voteValue = rating === 'helpful' ? 1 : 'notHelpful' ? -1 : 0;
    storeVote(pageLink, voteValue);
    console.log('Sending response...');
    res.json({ message: 'Feedback collected successfully!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while processing the feedback' });
  }
});

initDb().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
});
