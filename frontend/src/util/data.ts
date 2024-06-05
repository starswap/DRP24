import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../util/firebase';
import { CalendarEvent } from '../types/CalendarEvent';
import { PersonMap } from '../types/Person';

const EVENTS_COLLECITON = collection(db, 'events');
const USERS_COLLECTION = collection(db, 'users');
export const CURRENT_USER = 't8M8LxWOTKwBAkKHgEfo'; // TODO: Fetch from cookies for example

export function createEvent(currentEvent: CalendarEvent) {
  addDoc(EVENTS_COLLECITON, currentEvent);
}

export async function fetchUsers(): Promise<PersonMap> {
  const results = await getDocs(query(USERS_COLLECTION));
  const users: PersonMap = {};
  results.forEach((doc) => {
    users[doc.id] = { name: doc.data().name };
  });
  return users;
}
