import React from 'react';
import { CalendarEvent } from '../types/CalendarEvent';
import { EventDescription } from './EventDescription';
import { useNavigate } from 'react-router-dom';
import {
  MultiPageForm,
  MultiPageFormStateProps
} from '../MultiPageForm/MultiPageForm';
import { What } from './What';
import { Who } from './Who';
import { Where } from './Where';
import { When } from './When';
import { createEvent, CURRENT_USER } from '../util/data';

const EMPTY_EVENT: () => CalendarEvent = () => ({
  activity: '',
  creator: CURRENT_USER,
  participants: [],
  time: new Date(new Date().getTime() - 1000),
  location: '',
  statuses: {},
  meta: { creation_time_duration: 0 }
});

export function CreateEventScreen() {
  const navigate = useNavigate();
  const startTime = Date.now();
  const confirm = (currentEvent: CalendarEvent) => {
    const time_taken = Date.now() - startTime;
    console.log(`Time taken: ${time_taken}`);
    const currentEventWithMeta = {
      ...currentEvent,
      meta: { creation_time_duration: time_taken }
    };
    createEvent(currentEventWithMeta);
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
      defaultValue={EMPTY_EVENT()}
      sets={['Set Activity', 'Set People', 'Set Time', 'Set Location']}
    />
  );
}
