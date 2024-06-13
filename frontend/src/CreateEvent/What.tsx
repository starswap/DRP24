import { CalendarEvent } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ThemeGrid } from '../theme/ThemeGrid';
import { AudioRecordButton } from '../SpeechAccessibility/SpeechToText';
import { ThemeHeading } from '../theme/ThemeHeading';

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
      <ThemeHeading>Choose Activity</ThemeHeading>
      <ThemeGrid
        options={ACTIVITIES}
        save={saveActivity}
        selected={(v) => v === calevent.activity}
        width={3}
        addButtons={false}
      />
      <div className="grid grid-cols-2 flex">
        <ThemeTextbox
          placeholder={'Or type an activity:'}
          value={calevent.activity}
          onChange={(event) => saveActivity(event.target.value)}
        />
        <AudioRecordButton saveActivity={saveActivity} subject={'activity'} />
      </div>
    </>
  );
}
