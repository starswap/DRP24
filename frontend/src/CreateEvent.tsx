import React, { useState } from 'react';
import { ButtonComponent, ValueButton } from './ButtonComponent';
import { CalendarEvent } from '../types/CalendarEvent';

function GeneralCreateEvent() {
  const PAGE_ACTIVITY_DESC = [
    'You are doing: ',
    ', with: ',
    ', at time: ',
    ', at place: '
  ];
  const [pageNum, setPageNum] = useState(0);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent>({
    activity: '',
    participants: [],
    time: new Date(Date.now()),
    location: ''
  });
  const eventAndEventSetter = {
    calevent: currentEvent,
    activitySetter: setCurrentEvent
  };
  const PAGES = [
    () => What(eventAndEventSetter),
    () => Who(eventAndEventSetter),
    () => When(eventAndEventSetter),
    () => Where(eventAndEventSetter)
  ];

  function handleNext() {
    if (pageNum === PAGES.length - 1) {
      // Exit or something
      console.log('Finished activity');
    } else {
      setPageNum(pageNum + 1);
    }
  }

  function handleBack() {
    if (pageNum === 0) {
      console.log('Leaving activity page 0');
      // Exit or something
    } else {
      setPageNum(pageNum - 1);
    }
  }

  function convertEvent(e: CalendarEvent) {
    const r: Array<JSX.Element> = [];
    const fieldArr = [e.activity, e.participants, e.time, e.location];
    for (let i = 0; i < fieldArr.length; i++) {
      console.log(PAGE_ACTIVITY_DESC[i] + fieldArr[i] + '\n');
      r.push(<p key={i}>{PAGE_ACTIVITY_DESC[i] + fieldArr[i]}</p>);
    }
    return r;
  }

  const isLastPage = pageNum === PAGES.length - 1;
  return (
    <div className="flex flex-col items-center mx-auto p-4r p-2 w-full">
      <div>{PAGES[pageNum]()}</div>
      <div>
        <ButtonComponent onClick={handleBack} label={'Back'} />
        <ButtonComponent
          onClick={handleNext}
          label={isLastPage ? 'Confirm' : 'Next'}
        />
      </div>
      <h2> Current activity</h2>
      {convertEvent(currentEvent)}
      <div />
    </div>
  );
}

function What({
  calevent,
  activitySetter
}: {
  calevent: CalendarEvent;
  activitySetter: (a: CalendarEvent) => void;
}) {
  const handleClick = (event: any) => {
    const new_acc = { ...calevent, activity: event.target.value };
    activitySetter(new_acc);
  };
  return (
    <>
      <h1>What will you be doing</h1>
      <div className="flex-auto">
        <div className="flex flex-row flex-wrap w-full">
          <div className="flex flex-col basis-full flex-1">
            <ValueButton onClick={handleClick} label={'Walk'} value="Walk" />
            <ValueButton
              onClick={handleClick}
              label={'Cricket'}
              value="Cricket"
            />
            <ValueButton onClick={handleClick} label={'Bingo'} value="Bingo" />
          </div>
          <div className="flex flex-col basis-full flex-1">
            <ValueButton onClick={handleClick} label={'Poker'} value="Poker" />
            <ValueButton
              onClick={handleClick}
              label={'Cooking'}
              value="Cooking"
            />
            <ValueButton
              onClick={handleClick}
              label={'Coffee'}
              value="Coffee"
            />
          </div>
        </div>
      </div>
      <div>
        <input type="text" value={calevent.activity} onChange={handleClick} />
      </div>
    </>
  );
}
function Where({
  calevent,
  activitySetter
}: {
  calevent: CalendarEvent;
  activitySetter: (a: CalendarEvent) => void;
}) {
  const handleClick = (event: any) => {
    const new_acc = { ...calevent, location: event.target.value };
    activitySetter(new_acc);
  };
  return (
    <>
      <h1>Where will you be doing it?</h1>
      <div className="flex-auto">
        <div className="flex flex-row flex-wrap w-full">
          <div className="flex flex-col basis-full flex-1">
            <ValueButton onClick={handleClick} label={'Park'} value="Park" />
            <ValueButton
              onClick={handleClick}
              label={'Common Room'}
              value="Common Room"
            />
          </div>
        </div>
      </div>
      <div>
        <input type="text" value={calevent.location} onChange={handleClick} />
      </div>
    </>
  );
}
function Who({
  calevent,
  activitySetter
}: {
  calevent: CalendarEvent;
  activitySetter: (a: CalendarEvent) => void;
}) {
  const handleClick = (event: any) => {
    const new_acc = { ...calevent, participants: [event.target.value] };
    activitySetter(new_acc);
  };
  return (
    <>
      <h1>Who will you be doing it with</h1>
      <div className="flex-auto">
        <div className="flex flex-row flex-wrap w-full">
          <div className="flex flex-col basis-full flex-1">
            <ValueButton onClick={handleClick} label={'Alice'} value="Alice" />
            <ValueButton onClick={handleClick} label={'Bob'} value="Bob" />
          </div>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={calevent.participants.join(' ')}
          onChange={handleClick}
        />
      </div>
    </>
  );
}
function When({
  calevent,
  activitySetter
}: {
  calevent: CalendarEvent;
  activitySetter: (a: CalendarEvent) => void;
}) {
  const handleClick = (event: any) => {
    console.log(event.target.value);
    const new_acc = {
      ...calevent,
      time: new Date(event.target.value)
    };
    activitySetter(new_acc);
  };
  return (
    <>
      <h1>When will you be doing it?</h1>
      <div className="flex-auto">
        <div className="flex flex-row flex-wrap w-full">
          <div className="flex flex-col basis-full flex-1">
            <ValueButton
              onClick={handleClick}
              label={'Tomorrow 2pm'}
              value={new Date(2024, 4, 31, 2).toString()}
            />
            <ValueButton
              onClick={handleClick}
              label={'Tomorrow 8pm'}
              value={new Date(2024, 4, 31, 8).toString()}
            />
          </div>
        </div>
      </div>
      <div>
        <input
          type="text"
          className="w-60"
          value={calevent.time.toString()}
          onChange={handleClick}
        />
      </div>
    </>
  );
}

export default GeneralCreateEvent;
// export default ChooseActivity;
