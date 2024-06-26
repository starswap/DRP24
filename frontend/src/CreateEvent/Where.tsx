import { CalendarEvent } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ThemeGrid } from '../theme/ThemeGrid';
import { AudioRecordButton } from '../SpeechAccessibility/SpeechToText';
import { ThemeHeading } from '../theme/ThemeHeading';

export function Where({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const handleClick = (location: string) => {
    const new_acc = { ...calevent, location: location };
    updateActivity(new_acc);
  };
  const LOCATIONS = ['Park', 'Common Room'];

  return (
    <>
      <ThemeHeading>Choose Location</ThemeHeading>
      <ThemeGrid
        options={LOCATIONS}
        save={handleClick}
        selected={(e) => calevent.location === e}
        width={1}
        addButtons={false}
      />

      <ThemeTextbox
        placeholder="Or type a location:"
        value={calevent.location}
        onChange={(e) => handleClick(e.target.value)}
      />
      <AudioRecordButton saveActivity={handleClick} subject={'location'} />
    </>
  );
}
