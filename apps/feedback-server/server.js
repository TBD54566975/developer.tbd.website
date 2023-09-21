require('dotenv').config();

const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
// const lusca = require('lusca');
// @octokit/rest
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const config = {
  port: process.env.PORT || 3001,
  serverSecret: process.env.SERVER_SECRET,
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
  googleSpreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
};

console.info('Server secret:', { config });

// Init express app
const app = express();

// Middleware checking if the user is authenticated
// const isAuthenticated = (req, res, next) => {
//   if (req.session && req.session.isAuthenticated) {
//     next();
//   } else {
//     res.status(403).json({ message: 'Haha - Beat you to it! Not authorized' });
//   }
// };

// Security headers middleware
// app.use((req, res, next) => {
//   res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   next();
// });

// Init session
app.use(
  session({
    secret: config.serverSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: 'Strict' },
  }),
);

// Init Lusca for CSRF
// app.use(lusca({
//   csrf: {
//     key: 'x-csrf-token'
//   },
//   xframe: 'SAMEORIGIN',
//   p3p: 'ABCDEF',
//   hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
//   xssProtection: true
// }));

// Middleware to check the incoming header
// app.use((req, res, next) => {
//   const referer = req.header('Referer');
//   if (referer && !referer.startsWith('https://developer.tbd.website')) {
//     return res.status(403).send('Invalid Referer');
//   }
//   next();
// });

// Init CORS with options
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://developer.tbd.website',
      'https://deploy-preview-714--tbd-website-developer.netlify.app',
      null,
    ];
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
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
  ],
});

const doc = new GoogleSpreadsheet(
  config.googleSpreadsheetId,
  serviceAccountJWT,
);

// Route to get the CSRF token
// app.get("/api/csrf-token", isAuthenticated, (req, res) => {
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken });
});

// Route to POST the feedback
// app.post("/api/feedback", lusca.csrf(), async (req, res) => {
app.post('/api/feedback', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    console.log('Loading spreadsheet info...');
    await doc.loadInfo();
    console.log('Accessing sheet...');
    const sheet = doc.sheetsByIndex[0];
    console.log('Processing feedback...');
    const { rating, pageLink } = req.body;

    // Find the next empty row
    await sheet.loadCells('A2:C' + sheet.rowCount);
    let nextRowIndex;
    for (let i = 1; i < sheet.rowCount; i++) {
      const cell = sheet.getCell(i, 2); // 2 is the index for column C
      if (!cell.value) {
        nextRowIndex = i;
        break;
      }
    }

    if (nextRowIndex === undefined) {
      nextRowIndex = sheet.rowCount;
      await sheet.addRow({}); // Add a new empty row
    }

    const helpfulCell = sheet.getCell(nextRowIndex, 0);
    const notHelpfulCell = sheet.getCell(nextRowIndex, 1);
    const pageLinkCell = sheet.getCell(nextRowIndex, 2);

    if (rating === 'helpful') {
      helpfulCell.value = 1;
      notHelpfulCell.value = 0;
    } else if (rating === 'notHelpful') {
      helpfulCell.value = 0;
      notHelpfulCell.value = 1;
    }

    pageLinkCell.value = pageLink;

    await sheet.saveCells([helpfulCell, notHelpfulCell, pageLinkCell]);

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
