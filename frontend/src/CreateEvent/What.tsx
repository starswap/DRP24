import { CalendarEvent } from '../types/CalendarEvent';
import { ValueButton } from '../theme/ButtonComponent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';

export function What({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const saveActivity = (event: any) => {
    const new_acc = { ...calevent, activity: event.target.value };
    updateActivity(new_acc);
  };
  const ROW1 = ['Walk', 'Cricket', 'Bingo'];
  const ROW2 = ['Poker', 'Cooking', 'Coffee'];
  return (
    <>
      <h1>What will you be doing mark?</h1>
      <div className="grid grid-rows-2">
        <div className="flex">
          {ROW1.map((v) => (
            <ValueButton key={v} onClick={saveActivity} label={v} value={v} />
          ))}
        </div>
        <div className="flex">
          {ROW2.map((v) => (
            <ValueButton key={v} onClick={saveActivity} label={v} value={v} />
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
