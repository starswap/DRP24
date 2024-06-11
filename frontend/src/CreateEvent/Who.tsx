import { CalendarEvent, EventResponse } from '../types/CalendarEvent';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import React, { useEffect, useState } from 'react';
import { PersonMap } from '../types/Person';
import { CURRENT_USER, fetchUsers } from '../util/data';
import { ThemeGrid } from '../theme/ThemeGrid';
import { ThemeHeading } from '../theme/ThemeHeading';
import { UID } from '../types/UID';

export function Who({
  state: calevent,
  updateState: updateActivity
}: MultiPageFormStateProps<CalendarEvent>) {
  const [people, setPeople] = useState<PersonMap>({});

  const addPerson = (uid: UID) => {
    updateActivity((oldEvent) => ({
      ...oldEvent,
      participants: oldEvent.participants.includes(uid)
        ? oldEvent.participants
        : oldEvent.participants.concat([uid]),
      statuses: {
        ...oldEvent.statuses,
        [uid]: { person: people[uid], response: EventResponse.UNKNOWN }
      }
    }));
  };

  const removePerson = (uid: UID) => {
    updateActivity((oldEvent) => {
      delete oldEvent.statuses[uid];
      return {
        ...oldEvent,
        participants: oldEvent.participants.filter((uid_) => uid_ !== uid)
      };
    });
  };

  const saveActivity = (uid: UID) => {
    if (uid in calevent.statuses) {
      removePerson(uid);
    } else {
      addPerson(uid);
    }
  };

  useEffect(() => {
    fetchUsers().then(setPeople);
  }, []);

  useEffect(() => {
    if (CURRENT_USER in people) {
      addPerson(CURRENT_USER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people]);

  return (
    <>
      <ThemeHeading>Choose friends</ThemeHeading>
      <ThemeGrid
        options={Object.keys(people).filter((u) => u !== CURRENT_USER)}
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
