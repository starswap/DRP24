import { CalendarEvent, EventResponse } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { useEffect, useState } from 'react';
import { PersonMap } from '../types/Person';
import { CURRENT_USER, fetchUsers } from '../util/data';
import { ThemeGrid } from '../theme/ThemeGrid';

export function Who({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const [people, setPeople] = useState<PersonMap>({});
  useEffect(() => {
    fetchUsers().then(setPeople);
  }, []);

  const saveActivity = (uid: string) => {
    if (uid in calevent.statuses) {
      delete calevent.statuses[uid];
      calevent.participants.delete(uid);
      updateActivity({ ...calevent });
    } else {
      updateActivity({
        ...calevent,
        participants: calevent.participants.add(uid),
        statuses: {
          ...calevent.statuses,
          [uid]: { person: people[uid], response: EventResponse.UNKNOWN }
        }
      });
    }
  };

  return (
    <>
      <h1>Who will you be doing it with?</h1>
      <ThemeGrid
        options={Object.keys(people).filter((u) => u !== CURRENT_USER)}
        save={saveActivity}
        selected={(uid) => uid in calevent.statuses}
        display={(uid: string) =>
          people[uid].name.firstname + ' ' + people[uid].name.surname
        }
        width={1}
      />

      <ThemeTextbox
        placeholder="Or enter custom:"
        value={Object.keys(calevent.statuses)
          .map((uid) => calevent.statuses[uid].person.name.firstname)
          .join(', ')}
        onChange={(event) => saveActivity(event.target.value)}
      />
    </>
  );
}
