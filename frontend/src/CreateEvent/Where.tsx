import { CalendarEvent } from '../types/CalendarEvent';
import { ValueButton } from '../theme/ThemeButton';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ChangeEvent } from 'react';

export function Where({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    const new_acc = { ...calevent, location: event.target.value };
    updateActivity(new_acc);
  };
  return (
    <>
      <h1>Where will you be doing it?</h1>
      <div className="grid grid-rows-1">
        <ValueButton onClick={handleClick} label={'Park'} value="Park" />
        <ValueButton
          onClick={handleClick}
          label={'Common Room'}
          value="Common Room"
        />
      </div>
      <ThemeTextbox
        placeholder="Or enter custom:"
        value={calevent.location}
        onChange={handleClick}
      />
    </>
  );
}
