import React, { useEffect, useState } from 'react';
import { ThemeSubheading } from './theme/ThemeSubheading';
import { CURRENT_USER, fetchEvents } from './util/data';
import { CalendarEvent, EventResponse } from './types/CalendarEvent';
import { UID } from './types/UID';

export default function Home() {
  const [events, setEvents] = useState<[CalendarEvent, UID][]>([]);

  useEffect(() => {
    fetchEvents(CURRENT_USER).then(setEvents);
  }, []);

  console.log(events);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl">You are: Matilda Johnson</h1>

      <ThemeSubheading>Invites</ThemeSubheading>
      {events
        .filter(
          ([event]) =>
            event.statuses[CURRENT_USER].response === EventResponse.UNKNOWN
        )
        .map(([event, uid]) => (
          <p key={uid}>{event.activity}</p>
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
