import React from 'react';
import { CalendarEvent } from '../types/CalendarEvent';
import ThemeTextbox from '../theme/ThemeTextbox';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import { ThemeGrid } from '../theme/ThemeGrid';

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
      <h1>Where will you be doing it?</h1>
      <ThemeGrid
        options={LOCATIONS}
        save={handleClick}
        selected={(e) => calevent.location === e}
        width={1}
      />

      <ThemeTextbox
        placeholder="Or enter custom:"
        value={calevent.location}
        onChange={(e) => handleClick(e.target.value)}
      />
    </>
  );
}
