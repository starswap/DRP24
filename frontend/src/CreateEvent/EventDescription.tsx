import { CalendarEvent } from '../types/CalendarEvent';

export const EventDescription = (e: CalendarEvent) => {
  const PAGE_ACTIVITY_DESC = [
    'You are doing: ',
    'With: ',
    'At time: ',
    'At place: '
  ];
  const r: Array<JSX.Element> = [];
  const fieldArr = [e.activity, e.participants, e.time, e.location];
  for (let i = 0; i < fieldArr.length; i++) {
    r.push(<p key={i}>{PAGE_ACTIVITY_DESC[i] + fieldArr[i]}</p>);
  }
  return r;
};
