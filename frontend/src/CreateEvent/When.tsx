import { CalendarEvent } from '../types/CalendarEvent';
import { ValueButton } from '../theme/ButtonComponent';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';

export function When({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
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
          <ValueButton
            onClick={handleClick}
            label={'Tomorrow 2pm'}
            value={new Date(2024, 4, 31, 2).toString()}
          />
        </div>
        <div className="flex">
          <ValueButton
            onClick={handleClick}
            label={'Tomorrow 8pm'}
            value={new Date(2024, 4, 31, 8).toString()}
          />
        </div>
      </div>
    </>
  );
}
