import { CalendarEvent } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ThemeButton } from '../theme/ThemeButton';

export function Who({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    const new_acc = {
      ...calevent,
      participants: [{ name: event.target.value }]
    };
    updateActivity(new_acc);
  };
  return (
    <>
      <h1>Who will you be doing it with?</h1>
      <div className="grid grid-rows-2">
        <ThemeButton onClick={handleClick} value="Alice">
          Alice
        </ThemeButton>
        <ThemeButton onClick={handleClick} value="Bob">
          Bob
        </ThemeButton>
      </div>

      <ThemeTextbox
        placeholder="Or enter custom:"
        value={calevent.participants.map((person) => person.name).join(' ')}
        onChange={handleClick}
      />
    </>
  );
}
