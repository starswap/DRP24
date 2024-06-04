import { CalendarEvent } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ThemeButton } from '../theme/ThemeButton';

export function Where({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    const new_acc = { ...calevent, location: event.target.value };
    updateActivity(new_acc);
  };
  return (
    <>
      <h1>Where will you be doing it?</h1>
      <div className="grid grid-rows-1">
        <ThemeButton onClick={handleClick} value="Park">
          Park
        </ThemeButton>
        <ThemeButton onClick={handleClick} value="Common Room">
          Common Room
        </ThemeButton>
      </div>
      <ThemeTextbox
        placeholder="Or enter custom:"
        value={calevent.location}
        onChange={handleClick}
      />
    </>
  );
}
