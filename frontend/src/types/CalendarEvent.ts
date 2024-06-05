import { Person } from './Person';
import { UID } from './UID';

export type CalendarEvent = {
  activity: string;
  participants: Set<UID>;
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
