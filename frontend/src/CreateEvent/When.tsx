import { CalendarEvent } from '../types/CalendarEvent';
import DateTimePicker from 'react-datetime-picker';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import './When.css';
import dayjs from 'dayjs';

export function When({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const onSetDate = (date: Date | null) => {
    if (date) {
      const new_acc = {
        ...calevent,
        time: date
      };
      updateActivity(new_acc);
    }
  };
  return (
    <div className="when-container">
      <h1>When will you be doing it?</h1>
      <div className="datetime-picker-container">
        <input
          type="datetime-local"
          value={dayjs(calevent.time).format('YYYY-MM-DDThh:mm')}
          onChange={(e) => onSetDate(new Date(e.target.value))}
        />
      </div>
    </div>
  );
}
