import { CalendarEvent } from '../types/CalendarEvent';
import { ThemeButton, ValueButton } from '../theme/ThemeButton';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ChangeEvent, MouseEventHandler, MouseEvent } from 'react';

export function What({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const ROW1 = ['Walk', 'Cricket', 'Bingo'];
  const ROW2 = ['Poker', 'Cooking', 'Coffee'];
  const saveActivity = (event:MouseEvent<HTMLButtonElement>) => {
    updateActivity((calevent) => ({ ...calevent, activity: event.target.value }));
  }
  const saveActivity2 = (event) => {
    updateActivity((calevent) => ({ ...calevent, activity: event.target.value }));
  }

  return (
    <>
      <h1>What will you be doing mark?</h1>
      <div className="grid grid-rows-2">
        <div className="flex">
          {ROW1.map((v) => (
            <ThemeButton key={v} onClick={saveActivity2} value={v} />
          ))}
        </div>
        <div className="flex">
          {ROW2.map((v) => (
            <ThemeButton key={v} onClick={saveActivity2} value={v} />
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
