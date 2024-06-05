import { CalendarEvent, EventResponse } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ThemeButton } from '../theme/ThemeButton';
import { useEffect, useState } from 'react';
import { PersonMap } from '../types/Person';
import { CURRENT_USER, fetchUsers } from '../util/data';

export function Who({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const [people, setPeople] = useState<PersonMap>({});
  useEffect(() => {
    fetchUsers().then(setPeople);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    const uid = event.target.value;
    const new_acc = {
      ...calevent,
      participants: [...calevent.participants, uid],
      statuses: {
        ...calevent.statuses,
        [uid]: { person: people[uid], response: EventResponse.UNKNOWN }
      }
    };
    updateActivity(new_acc);
  };

  return (
    <>
      <h1>Who will you be doing it with?</h1>
      <div className="grid grid-rows-2">
        {Object.keys(people)
          .filter((u) => u !== CURRENT_USER)
          .map((uid) => (
            <ThemeButton onClick={handleClick} value={uid} key={uid}>
              {people[uid].name.firstname + ' ' + people[uid].name.surname}
            </ThemeButton>
          ))}
      </div>

      <ThemeTextbox
        placeholder="Or enter custom:"
        value={Object.keys(calevent.statuses)
          .map((uid) => calevent.statuses[uid].person.name.firstname)
          .join(', ')}
        onChange={handleClick}
      />
    </>
  );
}
