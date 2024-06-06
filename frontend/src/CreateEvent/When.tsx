import { CalendarEvent } from '../types/CalendarEvent';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { ThemeHeading } from '../theme/ThemeHeading';

export function When({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const onSetDate = (date: Date) => {
    const new_acc = {
      ...calevent,
      time: date
    };
    updateActivity(new_acc);
  };

  return (
    <>
      <ThemeHeading>Choose time</ThemeHeading>
      <div>
        <input
          type="datetime-local"
          value={dayjs(calevent.time).format('YYYY-MM-DDTHH:mm')}
          onChange={(e) => onSetDate(new Date(e.target.value))}
        />
      </div>
    </>
  );
}
