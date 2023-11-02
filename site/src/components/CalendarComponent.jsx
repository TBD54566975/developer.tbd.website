import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response failed');
        }
        return response.json();
      })
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.summary,
          desc: event.description,
          location: event.location,
          link: event.htmlLink,
        }));
        setEvents(formattedEvents);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100vh' }}
      />
    </div>
  );
}

export default CalendarComponent;
