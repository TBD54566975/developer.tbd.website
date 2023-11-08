import { google } from 'googleapis';

// Precondition checks
if (!process.env.CALENDAR_ID) {
  throw new Error(
    "env var 'CALENDAR_ID' is required. Attain from Google Calendar > Calendar Settings > Integrate Calendar"
  );
}
if (!process.env.API_KEY) {
  throw new Error(
    "env var 'API_KEY' is required. Attain from Google Cloud Console > Google API > Credentials"
  );
}
// constraint
const NUM_EVENTS_TO_FETCH = 30;

// logging
const logger = {
  debug: (...args) => {
    if (process.env.LOG_LEVEL === 'debug') {
      console.log(...args);
    }
  },
  info: (...args) => {
    if (process.env.LOG_LEVEL === 'debug' || process.env.LOG_LEVEL === 'info') {
      console.info(...args);
    }
  },
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args),
};

const calendar = google.calendar({
  version: 'v3',
  auth: process.env.API_KEY,
});

export async function handler(event, context) {
  const queryParams = event.queryStringParameters;
  const timeMin = queryParams.timeMin || new Date().toISOString();
  const timeMax =
    queryParams.timeMax ||
    new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString();
  const eventType = queryParams.eventType;

  try {
    const res = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
      timeMin: timeMin,
      timeMax: timeMax,
      maxResults: NUM_EVENTS_TO_FETCH,
      singleEvents: true,
      orderBy: 'startTime',
      fields:
        'items(attachments,start,end,summary,description,location,htmlLink)',
    });

    let events = res.data.items;
    if (!events || events.length === 0) {
      logger.debug('No upcoming events found.');
      return {
        statusCode: 404,
        body: 'Events coming soon..',
      };
    }

    if (eventType) {
      events = events.filter(
        (event) => event.description && event.description.includes(eventType)
      );
    }

    const calEvents = events.map((event) => {
      const eventDetails = {
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        summary: event.summary,
        hangoutLink: event.hangoutLink,
        htmlLink: event.htmlLink,
        location: event.location,
        description: event.description,
      };
      return eventDetails;
    });

    logger.info('Fetched events successfully.');
    return {
      statusCode: 200,
      body: JSON.stringify(calEvents),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=259200',
      },
    };
  } catch (error) {
    logger.error('Error fetching events:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
