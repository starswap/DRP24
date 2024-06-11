import { useEffect, useState } from 'react';
import { ThemeSubheading } from './theme/ThemeSubheading';
import {
  CURRENT_USER,
  fetchEvents,
  deleteEvent,
  fetchUsers,
  updateEventResponse
} from './util/data';
import { CalendarEvent, EventResponse } from './types/CalendarEvent';
import { UID } from './types/UID';
import dayjs from 'dayjs';
import { ThemeButton } from './theme/ThemeButton';
import { PersonMap } from './types/Person';

export default function Home() {
  const [events, setEvents] = useState<[CalendarEvent, UID][]>([]);
  const [users, setUsers] = useState<PersonMap>({});

  useEffect(() => {
    fetchEvents(CURRENT_USER).then(setEvents);
    fetchUsers().then(setUsers);
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

  function UsersDropdown() {
    return (
      <div>
        <label htmlFor="users">Change user: </label>
        <select id="users">
          {Object.entries(users).map(([uid, person]) => (
            <option key={uid}>{person.name.firstname}</option>
          ))}
        </select>
      </div>
    );
  }

  function GetEvents(our_response: EventResponse) {
    return (
      events
        // filter events based on if should be in invites, events, or declined
        .filter(
          ([event]) => event.statuses[CURRENT_USER].response === our_response
        )
        .map(([event, eventUID]) => (
          <>
            <p
              key={eventUID}
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
                  onClick={() =>
                    updateEventResponse(eventUID, EventResponse.ACCEPTED)
                  }
                >
                  Accept
                </ThemeButton>
                <ThemeButton
                  onClick={() =>
                    updateEventResponse(eventUID, EventResponse.REJECTED)
                  }
                >
                  Decline
                </ThemeButton>
                <ThemeButton
                  onClick={() => deleteEvent(eventUID)}
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
        <UsersDropdown />
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
