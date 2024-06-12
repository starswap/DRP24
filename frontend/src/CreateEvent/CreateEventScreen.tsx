import React from 'react';
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
import { createEvent, getCurrentUser } from '../util/data';

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
    createEvent(currentEvent);
    navigate('/');
  };

  const cancel = () => {
    console.log('Leaving activity page 0');
    navigate('/');
  };

  const pages = [What, Who, When, Where];

  const displayOnEveryPage = ({
    state: event,
    page: page,
    setPage: setPage
  }: MultiPageFormEveryPageProps<CalendarEvent>) => (
    <EventDescription event={event} page={page} setPage={setPage} />
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
