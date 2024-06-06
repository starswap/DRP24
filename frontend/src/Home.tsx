import React, { useEffect, useState } from 'react';
import { ThemeSubheading } from './theme/ThemeSubheading';
import { CURRENT_USER, fetchEvents } from './util/data';
import { CalendarEvent, EventResponse } from './types/CalendarEvent';
import { UID } from './types/UID';
import dayjs, { Dayjs } from 'dayjs';

export default function Home() {
  const [events, setEvents] = useState<[CalendarEvent, UID][]>([]);

  useEffect(() => {
    fetchEvents(CURRENT_USER).then(setEvents);
  }, []);

  // function getPeople (statuses: {
  //   [k: string]: Status}) {
  //     return ()
  //   }
  function GetResponseColour(response: EventResponse) {
    switch (response) {
      case EventResponse.ACCEPTED:
        return 'green';
      case EventResponse.REJECTED:
        return 'red';
      case EventResponse.UNKNOWN:
        return 'grey';
    }
  }
  console.log(events);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl">You are: Matilda Johnson</h1>

      <ThemeSubheading>Invites</ThemeSubheading>
      {events
        // .filter(
        //   ([event]) =>
        //     event.statuses[CURRENT_USER].response === EventResponse.UNKNOWN
        // )
        .map(([event, event_uid]) => (
          <p key={event_uid}>
            {event.activity} at {event.location} with{' '}
            {Object.entries(event.statuses)
              // dont display self
              // .filter(([uid, status]) => uid !== CURRENT_USER)
              // only display people who accepted
              // .filter(
              //   ([uid, status]) => status.response === EventResponse.ACCEPTED
              // )
              .map(
                ([uid, status]) => (
                  <span
                    key={uid}
                    style={{ color: GetResponseColour(status.response) }}
                  >
                    {status.person.name.firstname}{' '}
                  </span>
                )
                // status.person.name.firstname +
                // ' ' +
                // status.person.name.surname
              )}
            {/* .join({', '})} */}
            {/* // .join(', ')}{' '} */}
            at {dayjs(event.time).format('YYYY-MM-DD HH:mm')}
          </p>
        ))}

      <ThemeSubheading>Events</ThemeSubheading>
      <a
        className="m-1 border border-gray-500 rounded-md bg-gray-400 p-1"
        href="#create"
      >
        Create event
      </a>

      <ThemeSubheading>Declined</ThemeSubheading>
    </div>
  );
}
