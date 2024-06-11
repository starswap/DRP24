import { CalendarEvent, EventResponse } from '../types/CalendarEvent';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import React, { useEffect, useState } from 'react';
import { PersonMap } from '../types/Person';
import { getCurrentUser, fetchUsers } from '../util/data';
import { ThemeGrid } from '../theme/ThemeGrid';
import { ThemeHeading } from '../theme/ThemeHeading';

export function Who({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const [people, setPeople] = useState<PersonMap>({});

  const saveActivity = (uid: string) => {
    if (uid in calevent.statuses) {
      delete calevent.statuses[uid];
      updateActivity({
        ...calevent,
        participants: calevent.participants.filter((uid_) => uid_ !== uid)
      });
    } else {
      updateActivity({
        ...calevent,
        participants: calevent.participants.includes(uid)
          ? calevent.participants
          : calevent.participants.concat([uid]),
        statuses: {
          ...calevent.statuses,
          [uid]: { person: people[uid], response: EventResponse.UNKNOWN }
        }
      });
    }
  };

  useEffect(() => {
    fetchUsers().then(setPeople);
  }, []);

  useEffect(() => {
    if (getCurrentUser() in people) {
      saveActivity(getCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people]);

  return (
    <>
      <ThemeHeading>Choose friends</ThemeHeading>
      <ThemeGrid
        options={Object.keys(people).filter((u) => u !== getCurrentUser())}
        save={saveActivity}
        selected={(uid) => uid in calevent.statuses}
        display={(uid: string) =>
          people[uid].name.firstname + ' ' + people[uid].name.surname
        }
        width={1}
      />
    </>
  );
}
