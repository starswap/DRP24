import { CalendarEvent } from '../types/CalendarEvent';
import { ThemeButton } from '../theme/ThemeButton';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';

export function What({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const ACTIVITIES = ['Walk', 'Cricket', 'Bingo', 'Poker', 'Cooking', 'Coffee'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveActivity = (event: any) => {
    updateActivity((calevent) => ({
      ...calevent,
      activity: event.target.value
    }));
  };

  return (
    <>
      <h1>What will you be doing?</h1>
      <div className="grid grid-cols-3">
        {ACTIVITIES.map((v) => (
          <ThemeButton
            key={v}
            onClick={saveActivity}
            value={v}
            className={v === calevent.activity ? 'bg-green-400' : ''}
          >
            {v}
          </ThemeButton>
        ))}
      </div>
      <ThemeTextbox
        placeholder={'Or enter custom:'}
        value={calevent.activity}
        onChange={saveActivity}
      />
    </>
  );
}
