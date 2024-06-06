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
import { createEvent } from '../util/data';

const EMPTY_EVENT = () => ({
  activity: '',
  participants: new Set([]),
  time: new Date(Date.now()),
  location: '',
  statuses: {}
});

export function CreateEventScreen() {
  const navigate = useNavigate();

  const confirm = (currentEvent: CalendarEvent) => {
    createEvent(currentEvent);
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
    <>
      {' '}
      <h2>Current activity</h2> <EventDescription event={event} />{' '}
    </>
  );

  return (
    <MultiPageForm<CalendarEvent>
      confirm={confirm}
      cancel={cancel}
      pages={pages}
      displayOnEveryPage={displayOnEveryPage}
      defaultValue={EMPTY_EVENT()}
    />
  );
}