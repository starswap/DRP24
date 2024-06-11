import { useEffect, useState } from 'react';
import { ThemeSubheading } from './theme/ThemeSubheading';
import {
  updateEventResponse,
  subscribeToEvents,
  deleteEvent,
  getCurrentUser,
  fetchUsers,
  fetchEvents
} from './util/data';
import { CalendarEvent, EventResponse } from './types/CalendarEvent';
import { UID } from './types/UID';
import dayjs from 'dayjs';
import { ThemeButton } from './theme/ThemeButton';
import { PersonMap } from './types/Person';

type EventsWithResponseProps = {
  events: [CalendarEvent, UID][];
  response: EventResponse;
  user: UID;
};

function responseToColour(response: EventResponse) {
  switch (response) {
    case EventResponse.ACCEPTED:
      return 'green';
    case EventResponse.REJECTED:
      return 'red';
    case EventResponse.UNKNOWN:
      return 'grey';
  }
}

function AcceptDeclineButtons({ eventUID }: { eventUID: UID }) {
  return (
    <>
      <ThemeButton
        onClick={() => updateEventResponse(eventUID, EventResponse.ACCEPTED)}
      >
        Accept
      </ThemeButton>
      <ThemeButton
        onClick={() => updateEventResponse(eventUID, EventResponse.REJECTED)}
      >
        Decline
      </ThemeButton>
    </>
  );
}

function DeleteButton({ eventUID }: { eventUID: UID }) {
  return (
    <>
      <ThemeButton onClick={() => deleteEvent(eventUID)} className="bg-red-100">
        Delete
      </ThemeButton>
    </>
  );
}

function EventsWithResponse({
  events,
  response,
  user
}: EventsWithResponseProps) {
  const chosenEvents = events.filter(
    ([event]) => event.statuses[user].response === response
  );

  return (
    <>
      {chosenEvents.map(([event, eventUID]) => (
        <>
          <p
            key={eventUID}
            className="leading-loose p-2 hover:bg-gray-200 rounded-md"
          >
            <b>{event.activity}</b> at <b>{event.location}</b> with{' '}
            {/* <!-- get people: --> */}
            {Object.entries(event.statuses)
              // don't display self
              .filter(([uid]) => uid !== user)
              // display people's names in different colours
              .map(([uid, status], i) => (
                <span
                  key={uid}
                  style={{ color: responseToColour(status.response) }}
                >
                  <b>
                    {status.person.name.firstname} {status.person.name.surname}{' '}
                  </b>
                  {/* length - 2 because not writing out ourselves */}
                  {i < Object.entries(event.statuses).length - 2 ? ', ' : ' '}
                </span>
              ))}
            at {dayjs(new Date(event.time)).format('DD/MM/YYYY, HH:mm')}
          </p>
          {response === EventResponse.UNKNOWN && (
            <div>
              <AcceptDeclineButtons eventUID={eventUID} />
            </div>
          )}
          {event.creator === getCurrentUser() && (
            <div>
              <DeleteButton eventUID={eventUID} />
            </div>
          )}
        </>
      ))}
    </>
  );
}

function UsersDropdown({
  onChange,
  value,
  users
}: {
  onChange: (u: UID) => void;
  value: UID;
  users: PersonMap;
}) {
  return (
    <div>
      <label htmlFor="users" className="text-4xl">
        You are:{' '}
      </label>
      <select
        id="users"
        className="text-4xl"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(users).map(([uid, person]) => (
          <option key={uid} value={uid}>
            {person.name.firstname}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Home() {
  const [events, setEvents] = useState<[CalendarEvent, UID][]>([]);
  const [users, setUsers] = useState<PersonMap>({});
  const [currentUser, setCurrentUser] = useState<UID>(getCurrentUser());

  useEffect(() => {
    subscribeToEvents(getCurrentUser(), setEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', currentUser);
  }, [currentUser]);

  useEffect(() => {
    fetchEvents(currentUser).then(setEvents);
  }, [currentUser]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div className="flex flex-col items-center scrollbar-gutter:stable both-edges">
      <div className="flex flex-col items-center w-[calc(100vw-25px)] overflow-y: overlay">
        <UsersDropdown
          users={users}
          value={currentUser}
          onChange={setCurrentUser}
        />
        <br />
        <ThemeSubheading>Invites</ThemeSubheading>
        <EventsWithResponse
          user={getCurrentUser()}
          events={events}
          response={EventResponse.UNKNOWN}
        />

        <ThemeSubheading>Events</ThemeSubheading>
        <EventsWithResponse
          user={getCurrentUser()}
          events={events}
          response={EventResponse.ACCEPTED}
        />

        <a
          className="m-1 border border-gray-500 rounded-md bg-yellow-100 p-2 m-8 text-2xl"
          href="#create"
        >
          Create event
        </a>

        <ThemeSubheading className="flex-1 w-full">Declined</ThemeSubheading>
        <EventsWithResponse
          user={getCurrentUser()}
          events={events}
          response={EventResponse.REJECTED}
        />
      </div>
    </div>
  );
}
