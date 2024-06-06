import { CalendarEvent } from '../types/CalendarEvent';
import dayjs from 'dayjs';

type EventDescriptionProps = { event: CalendarEvent };

export const EventDescription = ({ event }: EventDescriptionProps) => {
  const PAGE_ACTIVITY_DESC = [
    'You are doing:',
    'With:',
    'At time:',
    'At place:'
  ];
  const fieldArr = [
    event.activity,
    Array.from(event.participants.values())
      .map((e) => event.statuses[e].person.name.firstname)
      .join(', '),
    event.time.getTime() < new Date().getTime()
      ? ''
      : dayjs(event.time).format('YYYY-MM-DD HH:mm'),
    event.location
  ];
  console.log(fieldArr);

  return (
    <>
      {fieldArr.map((fieldValue, i) => (
        <p key={i}>{PAGE_ACTIVITY_DESC[i] + ' ' + fieldValue}</p>
      ))}
    </>
  );
};
