import { CalendarEvent } from '../types/CalendarEvent';
import { ValueButton } from '../theme/ButtonComponent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';

export function Who({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const handleClick = (event: any) => {
    const new_acc = { ...calevent, participants: [event.target.value] };
    updateActivity(new_acc);
  };
  return (
    <>
      <h1>Who will you be doing it with?</h1>
      <div className="grid grid-rows-2">
        <ValueButton onClick={handleClick} label={'Alice'} value="Alice" />
        <ValueButton onClick={handleClick} label={'Bob'} value="Bob" />
      </div>

      <ThemeTextbox
        placeholder="Or enter custom:"
        value={calevent.participants.join(' ')}
        onChange={handleClick}
      />
    </>
  );
}
