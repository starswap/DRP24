import { Person } from './Person';
import { UID } from './UID';

export type CalendarEvent = {
  activity: string;
  creator: UID;
  participants: UID[];
  statuses: { [k: UID]: Status };
  time: Date;
  location: string;
  meta: { creation_time_duration: number };
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
