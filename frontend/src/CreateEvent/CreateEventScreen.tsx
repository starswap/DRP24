import React, { useRef } from 'react';
import { CalendarEvent } from '../types/CalendarEvent';
import { EventDescription } from './EventDescription';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MultiPageForm,
  MultiPageFormEveryPageProps
} from '../MultiPageForm/MultiPageForm';
import { What } from './What';
import { Who } from './Who';
import { Where } from './Where';
import { When } from './When';
import { Confirmation } from './Confirmation';
import { createEvent, getCurrentUser, createEventMeta } from '../util/data';
import { Reschedule } from '../Home';
import { Toaster } from 'react-hot-toast';

export const EMPTY_EVENT: () => CalendarEvent = () => ({
  activity: '',
  creator: getCurrentUser(),
  participants: [],
  time: new Date(new Date().getTime() - 1000),
  location: '',
  statuses: {}
});

export function CreateEventScreen() {
  // const { initialEvent } = useParams();
  const location = useLocation();
  const { initialEvent } = location.state ?? EMPTY_EVENT();

  const navigate = useNavigate();
  const startRef = useRef(Date.now());
  const confirm = (currentEvent: CalendarEvent) => {
    const time_taken = Date.now() - startRef.current;
    console.log(`Time taken: ${time_taken}`);
    createEvent(currentEvent).then((eventUID) => {
      createEventMeta(eventUID, time_taken);
      // set notification of rescheduling for when event starts
      const notifyTime = currentEvent.time;
      setTimeout(
        () => Reschedule(currentEvent, eventUID),
        notifyTime.getTime() - Date.now()
      );
    });
    navigate('/', { state: { confetti: true } });
  };

  function getEventTime(event: CalendarEvent) {
    return event.time.getTime();
  }

  const cancel = () => {
    console.log('Leaving activity page 0');
    navigate('/');
  };

  const pages = [What, Who, When, Where, Confirmation];

  const displayOnEveryPage = ({
    state: event,
    page: page,
    setPage: setPage
  }: MultiPageFormEveryPageProps<CalendarEvent>) => (
    <EventDescription event={event} page={page} setPage={setPage} />
  );

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 10000
        }}
      />
      <MultiPageForm<CalendarEvent>
        confirm={confirm}
        cancel={cancel}
        pages={pages}
        displayOnEveryPage={displayOnEveryPage}
        defaultValue={initialEvent ?? EMPTY_EVENT()}
        sets={[
          'Confirm Activity',
          'Confirm People',
          'Confirm Time',
          'Confirm Location'
        ]}
        getMinTime={getEventTime}
      />
    </>
  );
}
