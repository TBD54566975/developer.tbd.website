import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__docusaurus');

//  modal styling
const customStyles = {
  content: {
    width: '60%',
    maxWidth: '800px',
    height: 'auto',
    backgroundColor: '#202124',
    border: '1px solid #5F6368',
    borderRadius: '8px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
    zIndex: '1000',
    padding: '20px 40px',
    color: '#FFFFFF',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: '999',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    color: '#9c1cfc',
    fontSize: '1.5em',
    cursor: 'pointer',
  },
};

const eventTypes = [
  { label: '✨ All Events', value: 'all' },
  { label: '👀 Show & Tells', value: '#ShowTell' },
  { label: '🏢 Office Hours', value: '#OfficeHours' },
  { label: '💡 Workshops', value: '#Workshop' },
  { label: '🎮 Twitch Streams', value: '#TwitchStreams' },
  { label: '🎤 Conferences/Talks', value: '#ConferenceTalk' },
];

// generate google link
const createGoogleCalendarLink = (event) => {
  const startTime = new Date(event.start)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '');
  const endTime = new Date(event.end)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, '');
  const details = encodeURIComponent(
    event.description || 'No details provided.',
  );
  const location = encodeURIComponent(
    event.location || 'No location provided.',
  );
  const text = encodeURIComponent(event.summary || 'No title');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
};

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [groupedEvents, setGroupedEvents] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(new Set(['all']));

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedTypes((prevSelectedTypes) => {
      const newSelectedTypes = new Set(prevSelectedTypes);

      if (type === 'all') {
        newSelectedTypes.clear();
        newSelectedTypes.add('all');
      } else {
        newSelectedTypes.delete('all');
        if (newSelectedTypes.has(type)) {
          newSelectedTypes.delete(type);
        } else {
          newSelectedTypes.add(type);
        }
        if (newSelectedTypes.size === 0) {
          newSelectedTypes.add('all');
        }
      }
      filterEventsByType(events, newSelectedTypes);
      return newSelectedTypes;
    });
  };

  const filterEventsByType = (allEvents, selectedTypes) => {
    if (selectedTypes.has('all') || selectedTypes.size === 0) {
      groupEventsByDate(allEvents);
      return;
    }
    const filteredEvents = allEvents.filter((event) =>
      Array.from(selectedTypes).some(
        (type) => event.description && event.description.includes(type),
      ),
    );
    groupEventsByDate(filteredEvents);
  };

  useEffect(() => {
    filterEventsByType(events, selectedTypes);
  }, [selectedTypes, events]);

  useEffect(() => {
    const fetchEvents = () => {
      const startOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1,
      ).toISOString();
      const endOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0,
      ).toISOString();

      fetch(
        `/.netlify/functions/fetch-calendar-events?timeMin=${encodeURIComponent(
          startOfMonth,
        )}&timeMax=${encodeURIComponent(endOfMonth)}`,
      )
        .then((response) => response.json())
        .then((data) => {
          // Filter out old events
          const now = new Date();
          const upcomingEvents = data.filter((event) => {
            const eventStartDate = new Date(event.start);
            return eventStartDate >= now;
          });
          groupEventsByDate(upcomingEvents);
          setEvents(upcomingEvents);
        })
        .catch((error) => console.error('Error fetching events:', error));
    };

    fetchEvents();
  }, [currentMonth]);

  const formatEventDateTime = (event) => {
    if (!event) {
      return { date: '', time: '' };
    }
    return {
      date: new Date(event.start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: `${new Date(event.start)
        .toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        .replace(/^0+/, '')} - ${new Date(event.end)
        .toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        .replace(/^0+/, '')}`,
    };
  };

  const groupEventsByDate = (events) => {
    const grouped = events.reduce((acc, event) => {
      const date = new Date(event.start).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});

    setGroupedEvents(grouped);
  };

  const navigateMonth = (offset) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1),
    );
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };
  const closeModal = () => {
    setSelectedEvent(null);
    setIsOpen(false);
  };

  //   event card styling
  const eventCardStyles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 0',
    },
    navButton: {
      padding: '5px 10px',
      cursor: 'pointer',
      border: '1px solid #ccc',
      borderRadius: '4px',
      background: '#f0f0f0',
      color: '#333',
      fontSize: '16px',
      fontWeight: 'bold',
      outline: 'none',
      margin: '0 1px',
    },
    eventListContainer: {
      maxHeight: '600px',
      overflowY: 'auto',
      padding: '10px',
      borderRadius: '8px',
      cursor: 'pointer',
      backgroundColor: '#1C1C1C',
    },
    card: {
      border: '.5px solid #28e6ee',
      padding: '25px',
      margin: '10px 5px',
      borderRadius: '8px',
    },
    date: {
      fontWeight: 'bold',
      fontSize: '22px',
      fontstyle: 'italic',
      color: 'cyan',
    },
    summary: {
      fontSize: '20px',
      color: '#ffec18',
      padding: '5px',
    },
    time: {
      fontWeight: 'bold',
      marginLeft: '10px',
      color: 'light gray',
    },
    link: {
      textDecoration: 'none',
      color: '#5d768b',
    },
    section: {
      padding: '5px',
      borderRadius: '8px',
      margin: '25px 0',
    },
  };

  return (
    <div
      style={{ maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <div style={eventCardStyles.nav}>
        <button
          style={eventCardStyles.navButton}
          onClick={() => navigateMonth(-1)}
          aria-label="Previous Month"
        >
          <img
            src="/img/arrow-blue-right.svg"
            alt="Previous Month"
            style={{ transform: 'rotate(180deg)' }}
          />
        </button>
        <span style={{ margin: '0 10px', fontSize: '28px' }}>
          {' '}
          {currentMonth.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button
          style={eventCardStyles.navButton}
          onClick={() => navigateMonth(1)}
          aria-label="Next Month"
        >
          <img src="/img/arrow-blue-right.svg" alt="Next Month" />
        </button>
      </div>

      {/* Event type filter*/}
      <form style={{ margin: '20px 0' }}>
        {eventTypes.map((type) => (
          <label
            key={type.value}
            style={{
              marginRight: '10px',
              marginBottom: '10px',
            }}
          >
            <input
              type="checkbox"
              value={type.value}
              checked={selectedTypes.has(type.value)}
              onChange={handleTypeChange}
              style={{ marginRight: '8px' }}
            />
            {type.label}
          </label>
        ))}
      </form>

      {/* event section  */}
      <div style={eventCardStyles.eventListContainer}>
        {Object.keys(groupedEvents).map((date) => (
          <div key={date} style={eventCardStyles.section}>
            <div style={eventCardStyles.date}>
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            {groupedEvents[date].map((event, index) => (
              <div
                key={index}
                style={eventCardStyles.card}
                onClick={() => openModal(event)}
              >
                {event.imagePath && (
                  <img
                    src={event.imagePath}
                    alt={`Event: ${event.summary}`}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      marginTop: '10px',
                    }}
                  />
                )}

                <div style={eventCardStyles.summary}>{event.summary}</div>
                <div style={eventCardStyles.time}>
                  {formatEventDateTime(event).time}
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(createGoogleCalendarLink(event), '_blank');
                  }}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(to bottom, #111, #000)',
                    color: '#5d768b',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    textDecoration: 'none',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
                    marginTop: '15px',
                    fontWeight: 'bold',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '2px 4px 7px #2ce2ea';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow =
                      '2px 2px 5px rgba(0, 0, 0, 0.5)';
                  }}
                >
                  🗓️ Add to Calendar
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {selectedEvent ? (
          <>
            <button onClick={closeModal} style={customStyles.closeButton}>
              &times;
            </button>

            <h2>{selectedEvent.summary}</h2>
            <p>{formatEventDateTime(selectedEvent).dateTime}</p>
            <div
              style={{ fontFamily: 'IBM Plex Mono' }}
              dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
            />
          </>
        ) : (
          <div>Loading...</div>
        )}
        <a
          href="#"
          onClick={(e) => {
            e.stopPropagation();
            window.open(createGoogleCalendarLink(event), '_blank');
          }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(to bottom, #111, #000)',
            color: '#5d768b',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            textDecoration: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
            marginTop: '15px',
            fontWeight: 'bold',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '2px 4px 7px #2ce2ea';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
          }}
        >
          🗓️ Add to Calendar
        </a>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
