import { CalendarEvent } from '../types/CalendarEvent';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import dayjs from 'dayjs';

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
    <div>
      <h1>When will you be doing it?</h1>
      <div>
        <input
          type="datetime-local"
          value={dayjs(calevent.time).format('YYYY-MM-DDThh:mm')}
          onChange={(e) => onSetDate(new Date(e.target.value))}
        />
      </div>
    </div>
  );
}
