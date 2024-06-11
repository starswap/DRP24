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
    // TODO: update event
    console.log('update event');
  }

  function removeEvent() {
    // TODO: delete event
    console.log('delete event');
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
            <p
              key={event_uid}
              className="leading-loose p-2 hover:bg-gray-200 rounded-md"
            >
              <b>{event.activity}</b> at <b>{event.location}</b> with{' '}
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
                    <b>
                      {status.person.name.firstname}{' '}
                      {status.person.name.surname}{' '}
                    </b>
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
                <ThemeButton
                  onClick={() => removeEvent()}
                  className="bg-red-100"
                >
                  Delete
                </ThemeButton>
              </div>
            )}
          </>
        ))
    );
  }

  console.log(events);
  return (
    <div className="flex flex-col items-center scrollbar-gutter:stable both-edges">
      <div className="flex flex-col items-center w-[calc(100vw-25px)] overflow-y: overlay">
        <h1 className="text-2xl">You are: Matilda Johnson</h1>

        <ThemeSubheading>Invites</ThemeSubheading>
        {GetEvents(EventResponse.UNKNOWN)}

        <ThemeSubheading>Events</ThemeSubheading>
        {GetEvents(EventResponse.ACCEPTED)}

        <a
          className="m-1 border border-gray-500 rounded-md bg-yellow-100 p-2 m-8 text-2xl"
          href="#create"
        >
          Create event
        </a>

        <ThemeSubheading className="flex-1 w-full">Declined</ThemeSubheading>
        {GetEvents(EventResponse.REJECTED)}
      </div>
    </div>
  );
}
