import { Person } from './Person';
export type CalendarEvent = {
  activity: string;
  participants: Person[];
  time: Date;
  location: string;
};
