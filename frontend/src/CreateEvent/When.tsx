import { CalendarEvent } from '../types/CalendarEvent';
import { ThemeButton } from '../theme/ThemeButton';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';

export function When({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    console.log(event.target.value);
    const new_acc = {
      ...calevent,
      time: new Date(event.target.value)
    };
    updateActivity(new_acc);
  };
  return (
    <>
      <h1>When will you be doing it?</h1>
      <div className="grid grid-rows-2">
        <div className="flex">
          <ThemeButton
            onClick={handleClick}
            value={new Date(2024, 4, 31, 2).toString()}
          >
            Tomorrow 2pm
          </ThemeButton>
        </div>
        <div className="flex">
          <ThemeButton
            onClick={handleClick}
            value={new Date(2024, 4, 31, 8).toString()}
          >
            Tomorrow 8pm
          </ThemeButton>
        </div>
      </div>
    </>
  );
}
