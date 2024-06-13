import React from 'react';
import { CalendarEvent } from '../types/CalendarEvent';
import dayjs from 'dayjs';
import { getCurrentUser } from '../util/data';
import { ThemeButton } from '../theme/ThemeButton';

type EventDescriptionProps = {
  event: CalendarEvent;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const EventDescription = ({ event, setPage }: EventDescriptionProps) => {
  const PAGE_ACTIVITY_DESC = [
    'You are doing:',
    'With:',
    'At time:',
    'At place:'
  ];
  const PAGE_ACTIVITY_NAME = ['Activity', 'People', 'Time', 'Location'];
  const fieldArr = [
    event.activity,
    Array.from(event.participants.values())
      .filter((e) => e !== getCurrentUser())
      .map((e) => event.statuses[e].person.name.firstname)
      .join(', '),
    event.time.getTime() < new Date().getTime()
      ? ''
      : dayjs(event.time).format('YYYY-MM-DD HH:mm'),
    event.location
  ];
  console.log(fieldArr);

  return (
    <div className="border border-black border-2 rounded-[4px] m-2 p-3 w-80 cursor-pointer">
      {fieldArr.map((fieldValue, i) => (
        <div
          key={i}
          onClick={() => {
            setPage(i);
          }}
        >
          {PAGE_ACTIVITY_DESC[i] + ' '}
          <span className="underline">
            {fieldValue === '' ? '_'.repeat(20) : fieldValue}
          </span>
          <ThemeButton
            onClick={() => {
              setPage(i);
            }}
          >
            Change {PAGE_ACTIVITY_NAME[i]}
          </ThemeButton>
        </div>
      ))}
    </div>
  );
};
