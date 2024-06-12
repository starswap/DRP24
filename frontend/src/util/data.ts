import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  query,
  updateDoc,
  getDocs,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../util/firebase';
import { CalendarEvent, EventResponse } from '../types/CalendarEvent';
import { PersonMap } from '../types/Person';
import { UID } from '../types/UID';

const EVENTS_COLLECITON = collection(db, 'events');
const USERS_COLLECTION = collection(db, 'users');
const META_COLLECTION = collection(db, 'meta');
export const DEFAULT_USER = 't8M8LxWOTKwBAkKHgEfo'; // TODO: Fetch from cookies for example

export function getCurrentUser() {
  return localStorage.getItem('user') ?? DEFAULT_USER;
}

/* Returns the ID of the event firebase generated */
export async function createEvent(currentEvent: CalendarEvent) {
  const eventRef = await addDoc(EVENTS_COLLECITON, currentEvent);
  return eventRef.id;
}

export function createEventMeta(eventId: string, timeTaken: number) {
  addDoc(META_COLLECTION, { eventId: eventId, timeTaken: timeTaken });
}

export async function fetchUsers(): Promise<PersonMap> {
  const results = await getDocs(query(USERS_COLLECTION));
  const users: PersonMap = {};
  results.forEach((doc) => {
    users[doc.id] = { name: doc.data().name };
  });
  return users;
}

export async function subscribeToEvents(
  uid: UID,
  callback: (es: [CalendarEvent, UID][]) => void
) {
  const q = query(
    EVENTS_COLLECITON,
    where('participants', 'array-contains', uid)
  );
  onSnapshot(q, (querySnapshot) => {
    const events: [CalendarEvent, UID][] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return [
        { ...data, time: new Date(data.time.seconds * 1000) } as CalendarEvent,
        doc.id
      ];
    });
    callback(events);
  });
}

export async function fetchEvents(uid: UID): Promise<[CalendarEvent, UID][]> {
  const results = await getDocs(
    query(EVENTS_COLLECITON, where('participants', 'array-contains', uid))
  );
  return results.docs.map((doc) => {
    const data = doc.data();
    return [
      { ...data, time: new Date(data.time.seconds * 1000) } as CalendarEvent,
      doc.id
    ];
  }); // TODO: Check that this is in fact of the correct type maybe
}

export async function updateEventResponse(
  uid: UID,
  newResponse: EventResponse
) {
  await updateDoc(doc(db, 'events', uid), {
    [`statuses.${getCurrentUser()}.response`]: newResponse
  });
}

export async function deleteEvent(uid: UID) {
  await deleteDoc(doc(db, 'events', uid));
}
