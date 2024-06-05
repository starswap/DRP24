import { CalendarEvent } from '../types/CalendarEvent';

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
    event.participants
      .map((e) => event.statuses[e].person.name.firstname)
      .join(', '),
    event.time,
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
