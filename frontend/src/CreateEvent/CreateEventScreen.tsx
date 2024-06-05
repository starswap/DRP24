import { CalendarEvent } from '../types/CalendarEvent';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../util/firebase';
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

const EMPTY_EVENT = {
  activity: '',
  participants: [],
  time: new Date(Date.now()),
  location: ''
};

export function CreateEventScreen() {
  const navigate = useNavigate();

  const confirm = (currentEvent: CalendarEvent) => {
    addDoc(collection(db, 'events'), currentEvent);
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
      defaultValue={EMPTY_EVENT}
    />
  );
}
