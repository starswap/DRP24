import { Person } from './Person'; 

export type CalendarEvent = {
    activity: string,
    participants: Person[],
    time: typeof Date,
    location: string
}
