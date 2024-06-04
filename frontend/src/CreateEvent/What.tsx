import { CalendarEvent } from '../types/CalendarEvent';
import { ThemeButton } from '../theme/ThemeButton';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';

export function What({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const ROW1 = ['Walk', 'Cricket', 'Bingo'];
  const ROW2 = ['Poker', 'Cooking', 'Coffee'];
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
      <div className="grid grid-rows-2">
        <div className="flex">
          {ROW1.map((v) => (
            <ThemeButton key={v} onClick={saveActivity} value={v}>
              {v}
            </ThemeButton>
          ))}
        </div>
        <div className="flex">
          {ROW2.map((v) => (
            <ThemeButton key={v} onClick={saveActivity} value={v}>
              {v}
            </ThemeButton>
          ))}
        </div>
      </div>
      <ThemeTextbox
        placeholder={'Or enter custom:'}
        value={calevent.activity}
        onChange={saveActivity}
      />
    </>
  );
}
