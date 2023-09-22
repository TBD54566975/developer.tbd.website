require('dotenv').config();

const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const config = {
  port: process.env.PORT || 3001,
  serverSecret: process.env.SERVER_SECRET,
  serverAllowedOrigins: (process.env.SERVER_ALLOWED_ORIGINS || '').split(','),
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  googleSpreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
};

console.info('Server secret:', {
  ...config,
  serverSecret: '***',
  googlePrivateKey: '***',
});

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

// Google Spreadsheet settings
const serviceAccountJWT = new JWT({
  email: config.googleClientEmail,
  key: config.googlePrivateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

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
    console.log('Loading spreadsheet info...');
    const doc = new GoogleSpreadsheet(
      config.googleSpreadsheetId,
      serviceAccountJWT,
    );
    await doc.loadInfo();

    console.log('Accessing sheet...', doc.title);
    const sheet = doc.sheetsByIndex[0];

    const helpfulCell = rating === 'helpful' ? 1 : 0;
    const notHelpfulCell = rating === 'notHelpful' ? 1 : 0;
    console.log('Processing feedback...', { rating, pageLink });
    await sheet.addRow([helpfulCell, notHelpfulCell, pageLink]);

    console.log('Sending response...');
    res.json({ message: 'Feedback collected successfully!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while processing the feedback' });
  }
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
