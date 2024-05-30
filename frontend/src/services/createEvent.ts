import { db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { CalendarEvent } from '../../../common/types/CalendarEvent';

function createEvent(event: CalendarEvent) {
  setDoc(doc(db, 'events'), event);
}
