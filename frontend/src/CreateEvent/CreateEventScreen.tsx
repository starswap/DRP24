import React from 'react';
import { CalendarEvent } from '../types/CalendarEvent';
import { EventDescription } from './EventDescription';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  MultiPageForm,
  MultiPageFormStateProps
} from '../MultiPageForm/MultiPageForm';
import { What } from './What';
import { Who } from './Who';
import { Where } from './Where';
import { When } from './When';
import { createEvent, getCurrentUser } from '../util/data';
import { Reschedule } from '../Home';

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

  const confirm = (currentEvent: CalendarEvent) => {
    createEvent(currentEvent).then((eventUID) => {
      const notifyTime = currentEvent.time;
      setTimeout(
        () => Reschedule(currentEvent, eventUID),
        notifyTime.getTime() - Date.now()
      );
    });
    navigate('/');
  };

  const cancel = () => {
    console.log('Leaving activity page 0');
    navigate('/');
  };

  const pages = [What, Who, When, Where];

  const displayOnEveryPage = ({
    state: event
  }: MultiPageFormStateProps<CalendarEvent>) => (
    <EventDescription event={event} />
  );

  return (
    <MultiPageForm<CalendarEvent>
      confirm={confirm}
      cancel={cancel}
      pages={pages}
      displayOnEveryPage={displayOnEveryPage}
      defaultValue={initialEvent ?? EMPTY_EVENT()}
      sets={['Set Activity', 'Set People', 'Set Time', 'Set Location']}
    />
  );
}
