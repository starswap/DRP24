import { Person, UID } from './Person';

export type CalendarEvent = {
  activity: string;
  participants: UID[];
  statuses: { [k: UID]: Status };
  time: Date;
  location: string;
};

export type Status = {
  person: Person;
  response: EventResponse;
};

export enum EventResponse {
  ACCEPTED,
  REJECTED,
  UNKNOWN
}
