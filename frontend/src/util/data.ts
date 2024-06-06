import { addDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../util/firebase';
import { CalendarEvent } from '../types/CalendarEvent';
import { PersonMap } from '../types/Person';
import { UID } from '../types/UID';

const EVENTS_COLLECITON = collection(db, 'events');
const USERS_COLLECTION = collection(db, 'users');
export const CURRENT_USER = 't8M8LxWOTKwBAkKHgEfo'; // TODO: Fetch from cookies for example

export function createEvent(currentEvent: CalendarEvent) {
  addDoc(EVENTS_COLLECITON, {
    ...currentEvent,
    participants: Array.from(currentEvent.participants.values()) + CURRENT_USER
  });
}

export async function fetchUsers(): Promise<PersonMap> {
  const results = await getDocs(query(USERS_COLLECTION));
  const users: PersonMap = {};
  results.forEach((doc) => {
    users[doc.id] = { name: doc.data().name };
  });
  return users;
}

export async function fetchEvents(uid: UID): Promise<[CalendarEvent, UID][]> {
  const results = await getDocs(
    query(EVENTS_COLLECITON, where('participants', 'array-contains', uid))
  );
  return results.docs.map((doc) => [doc.data() as CalendarEvent, doc.id]); // TODO: Check that this is in fact of the correct type maybe
}
