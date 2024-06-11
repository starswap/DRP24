import React from 'react';
import { CalendarEvent } from '../types/CalendarEvent';
import dayjs from 'dayjs';
import { CURRENT_USER } from '../util/data';

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
      .filter((e) => e !== CURRENT_USER)
      .map((e) => event.statuses[e].person.name.firstname)
      .join(', '),
    event.time.getTime() < new Date().getTime()
      ? ''
      : dayjs(event.time).format('YYYY-MM-DD HH:mm'),
    event.location
  ];
  console.log(fieldArr);

  return (
    <div className="border border-black border-2 rounded-[4px] m-2 p-3 w-80">
      {fieldArr.map((fieldValue, i) => (
        <div key={i}>
          {PAGE_ACTIVITY_DESC[i] + ' '}
          <span className="underline">
            {fieldValue === '' ? '_'.repeat(20) : fieldValue}
          </span>
        </div>
      ))}
    </div>
  );
};
