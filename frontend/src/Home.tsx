import { useEffect, useState } from 'react';
import { ThemeSubheading } from './theme/ThemeSubheading';
import { CURRENT_USER, fetchEvents } from './util/data';
import { CalendarEvent, EventResponse } from './types/CalendarEvent';
import { UID } from './types/UID';
import dayjs from 'dayjs';
import { ThemeButton } from './theme/ThemeButton';

export default function Home() {
  const [events, setEvents] = useState<[CalendarEvent, UID][]>([]);

  useEffect(() => {
    fetchEvents(CURRENT_USER).then(setEvents);
  }, []);

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

  function updateResponse(response: EventResponse) {
    // TODO: update response
    console.log('update response');
  }

  function GetEvents(our_response: EventResponse) {
    return (
      events
        // filter events based on if should be in invites, events, or declined
        .filter(
          ([event]) => event.statuses[CURRENT_USER].response === our_response
        )
        .map(([event, event_uid]) => (
          <>
            <p key={event_uid}>
              {event.activity} at {event.location} with{' '}
              {/* <!-- get people: --> */}
              {Object.entries(event.statuses)
                // dont display self
                .filter(([uid]) => uid !== CURRENT_USER)
                // only display people who accepted
                // .filter(
                //   ([uid, status]) => status.response === EventResponse.ACCEPTED
                // )
                // display peoples names in different colours
                .map(([uid, status], i) => (
                  <span
                    key={uid}
                    style={{ color: GetResponseColour(status.response) }}
                  >
                    {status.person.name.firstname} {status.person.name.surname}
                    {/* length -2 because not writing out ourselves */}
                    {i < Object.entries(event.statuses).length - 2 ? ', ' : ' '}
                  </span>
                ))}
              {/* display time in good format */}
              at {dayjs(new Date(event.time)).format('DD/MM/YYYY, HH:mm')}
            </p>
            {Object.is(our_response, EventResponse.UNKNOWN) && (
              <div>
                <ThemeButton
                  onClick={() => updateResponse(EventResponse.ACCEPTED)}
                >
                  Accept
                </ThemeButton>
                <ThemeButton
                  onClick={() => updateResponse(EventResponse.REJECTED)}
                >
                  Decline
                </ThemeButton>
              </div>
            )}
          </>
        ))
    );
  }

  console.log(events);
  return (
    <div className="flex flex-col items-center">
      <style>{'body { background-color: #f2fcf4; }'}</style>

      <h1 className="text-xl">You are: Matilda Johnson</h1>

      <ThemeSubheading>Invites</ThemeSubheading>
      {GetEvents(EventResponse.UNKNOWN)}

      <ThemeSubheading>Events</ThemeSubheading>
      {GetEvents(EventResponse.ACCEPTED)}

      <a
        className="m-1 border border-gray-500 rounded-md bg-yellow-100 p-1"
        href="#create"
      >
        Create event
      </a>

      <ThemeSubheading>Declined</ThemeSubheading>
      {GetEvents(EventResponse.REJECTED)}
    </div>
  );
}
