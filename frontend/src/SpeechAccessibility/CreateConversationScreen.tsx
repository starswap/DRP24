import { useState, useEffect } from 'react';
import { ConversationRecordButton } from './ConvsersationBot';
import { createEvent, getCurrentUser, createEventMeta } from '../util/data';
import { CalendarEvent } from '../types/CalendarEvent';
import { EventDescription } from '../CreateEvent/EventDescription';
import { Who } from '../CreateEvent/Who';

export const EMPTY_EVENT: () => CalendarEvent = () => ({
  activity: '',
  creator: getCurrentUser(),
  participants: [],
  time: new Date(new Date().getTime() - 1000),
  location: '',
  statuses: {}
});

export function CreateConversationScreen() {
  const [state, updateState] = useState(EMPTY_EVENT());

  return (
    <div className="flex flex-col items-center mx-auto p-4r p-2">
      Tell us what you would like to do. <br />
      Who you would like to do it with. <br />
      Where you would like to do it. <br />
      When you would like to do it. <br />
      <ConversationRecordButton updateState={updateState} state={state} />
    </div>
  );
}
