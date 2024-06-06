import { CalendarEvent } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ThemeGrid } from '../theme/ThemeGrid';

export function What({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const ACTIVITIES = ['Walk', 'Cricket', 'Bingo', 'Poker', 'Cooking', 'Coffee'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveActivity = (activity: string) => {
    updateActivity((calevent) => ({
      ...calevent,
      activity: activity
    }));
  };

  return (
    <>
      <h1>Choose Activity</h1>
      <ThemeGrid
        options={ACTIVITIES}
        save={saveActivity}
        selected={(v) => v === calevent.activity}
        width={3}
      />
      <ThemeTextbox
        placeholder={'Or enter custom:'}
        value={calevent.activity}
        onChange={(event) => saveActivity(event.target.value)}
      />
    </>
  );
}
