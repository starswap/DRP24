import { CalendarEvent, EventResponse } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import React, { useEffect, useState } from 'react';
import { PersonMap } from '../types/Person';
import { CURRENT_USER, fetchUsers } from '../util/data';
import { ThemeGrid } from '../theme/ThemeGrid';

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
    if (CURRENT_USER in people) {
      saveActivity(CURRENT_USER);
    }
  }, [people]);

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
      {/* 
      <ThemeTextbox
        placeholder="Or enter custom:"
        onChange={(event) => {
          const people = event.target.value.split(", ");
          people.forEach((person) => {

          })
          eventsaveActivity(event.target.value)
        }}
      /> */}
    </>
  );
}
