import { useEffect, useState } from 'react';
import { ThemeSubheading } from './theme/ThemeSubheading';
import {
  updateEventResponse,
  subscribeToEvents,
  deleteEvent,
  getCurrentUser,
  fetchUsers,
  fetchEvents,
  createEvent
} from './util/data';
import { CalendarEvent, EventResponse } from './types/CalendarEvent';
import { UID } from './types/UID';
import dayjs from 'dayjs';
import { ThemeButton } from './theme/ThemeButton';
import { ThemeLink } from './theme/ThemeLink';
import { PersonMap } from './types/Person';
import toast, { Toaster } from 'react-hot-toast';
import ConfettiExplosion from 'react-confetti-explosion';
import { useLocation } from 'react-router-dom';
import './Home.css';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
// const displayOldEvents = false;

type EventsWithResponseProps = {
  events: [CalendarEvent, UID][];
  response: EventResponse;
  displayOldEvents: boolean;
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

function DeleteButton({ eventUID }: { eventUID: UID }) {
  return (
    <>
      <ThemeButton onClick={() => deleteEvent(eventUID)} className="bg-red-100">
        Delete
      </ThemeButton>
    </>
  );
}

export function Reschedule(event: CalendarEvent, eventUID: UID) {
  const newTime = new Date();
  newTime.setTime(event.time.getTime() + ONE_WEEK);

  const newStatuses = event.statuses;
  for (const uid of Object.keys(newStatuses)) {
    newStatuses[uid] = {
      ...newStatuses[uid],
      response:
        uid === getCurrentUser()
          ? EventResponse.ACCEPTED
          : EventResponse.UNKNOWN
    };
  }

  const newEvent = {
    ...event,
    creator: getCurrentUser(),
    time: newTime,
    statuses: newStatuses
  };

  toast((t) => (
    <span>
      Reschedule your recent event for next week:{' '}
      <DisplayEvent event={newEvent} eventUID={eventUID} />
      <div>
        <ThemeButton
          onClick={() => {
            createEvent(newEvent);
            toast.dismiss(t.id);
          }}
        >
          Yes
        </ThemeButton>
        <ThemeButton onClick={() => toast.dismiss(t.id)}>No</ThemeButton>
        <ThemeLink
          to="/create"
          state={{ initialEvent: newEvent }}
          onClick={() => toast.dismiss(t.id)}
        >
          Modify
        </ThemeLink>
      </div>
    </span>
  ));
}

function DisplayEvent({
  event,
  eventUID
}: {
  event: CalendarEvent;
  eventUID: UID;
}) {
  return (
    <p
      key={eventUID}
      className="leading-loose p-2 hover:bg-gray-200 rounded-md"
    >
      <b>{event.activity}</b> at <b>{event.location}</b> with{' '}
      {/* <!-- get people: --> */}
      {Object.entries(event.statuses)
        // don't display self
        .filter(([uid]) => uid !== getCurrentUser())
        // display people's names in different colours
        .map(([uid, status], i) =>
          status.response === EventResponse.REJECTED ? (
            <s key={uid}>
              {status.person.name.firstname} {status.person.name.surname}{' '}
              {i < Object.entries(event.statuses).length - 2 ? ', ' : ' '}
            </s>
          ) : (
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
          )
        )}
      at {dayjs(new Date(event.time)).format('DD/MM/YYYY, HH:mm')}
    </p>
  );
}

function EventsWithResponse({
  events,
  response,
  displayOldEvents
}: EventsWithResponseProps) {
  const chosenEvents = events.filter(
    ([event]) =>
      event.statuses[getCurrentUser()].response === response &&
      (!displayOldEvents || event.time.getTime() > Date.now())
  );

  return (
    <>
      {chosenEvents.map(([event, eventUID]) => (
        <>
          <Toaster
            toastOptions={{
              duration: 100000
            }}
          />
          <DisplayEvent event={event} eventUID={eventUID} />

          <div>
            {(response === EventResponse.UNKNOWN ||
              response === EventResponse.REJECTED) && (
              <ThemeButton
                onClick={() =>
                  updateEventResponse(eventUID, EventResponse.ACCEPTED)
                }
              >
                Accept
              </ThemeButton>
            )}
            {response === EventResponse.UNKNOWN && (
              <ThemeButton
                onClick={() =>
                  updateEventResponse(eventUID, EventResponse.REJECTED)
                }
              >
                Decline
              </ThemeButton>
            )}
          </div>
          {event.creator === getCurrentUser() && (
            <div>
              <DeleteButton eventUID={eventUID} />

              <ThemeLink to="/create" state={{ initialEvent: event }}>
                Edit
              </ThemeLink>
            </div>
          )}
          <div>
            <ThemeButton
              onClick={() => Reschedule(event, eventUID)}
              className="bg-blue-100"
            >
              Repeat activity
            </ThemeButton>
          </div>
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
  const [displayOldEvents, setDisplayOldEvents] = useState<boolean>(true);

  const location = useLocation();
  const [confetti, setConfetti] = useState(
    location.state ? location.state.confetti : false
  );

  useEffect(() => {
    if (confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {confetti && <ConfettiExplosion />}
      <div className="flex flex-col items-center w-[calc(100vw-25px)] overflow-y: overlay">
        <div>
          <br />
          <span>Display previous events: </span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => setDisplayOldEvents(!displayOldEvents)}
            />
            <span className="slider round" />
          </label>
          <UsersDropdown
            users={users}
            value={currentUser}
            onChange={setCurrentUser}
          />
        </div>
        {/* <br /> */}

        <a
          className="m-1 border border-gray-500 rounded-md bg-yellow-100 p-2 m-8 text-2xl"
          href="#create"
        >
          Create event
        </a>
        <ThemeSubheading>Invites</ThemeSubheading>
        <EventsWithResponse
          events={events}
          response={EventResponse.UNKNOWN}
          displayOldEvents={displayOldEvents}
        />

        <ThemeSubheading>Events</ThemeSubheading>
        <EventsWithResponse
          events={events}
          response={EventResponse.ACCEPTED}
          displayOldEvents={displayOldEvents}
        />

        <ThemeSubheading className="flex-1 w-full">Declined</ThemeSubheading>
        <EventsWithResponse
          events={events}
          response={EventResponse.REJECTED}
          displayOldEvents={displayOldEvents}
        />
      </div>
    </div>
  );
}
