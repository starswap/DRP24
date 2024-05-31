import React, { SyntheticEvent, useState } from 'react';
import { ButtonComponent, ValueButton } from './ButtonComponent';
import { CalendarEvent } from '../types/CalendarEvent';
import { doc, setDoc } from 'firebase/firestore';
import CustomTextbox from './CustomTextbox';
import { db } from './firebase';
function GeneralCreateEvent() {
  const PAGE_ACTIVITY_DESC = [
    'You are doing: ',
    'With: ',
    'At time: ',
    'At place: '
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
      setDoc(doc(db, 'Events', 'myEvents'), currentEvent);
      console.log('Saved to DB');
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
  const ROW1 = ['Walk', 'Cricket', 'Bingo'];
  const ROW2 = ['Poker', 'Cooking', 'Coffee'];
  return (
    <>
      <h1>What will you be doing mark?</h1>
      <div className="grid grid-rows-2">
        <div className="flex">
          {ROW1.map((v) => (
            <ValueButton key={v} onClick={handleClick} label={v} value={v} />
          ))}
        </div>
        <div className="flex">
          {ROW2.map((v) => (
            <ValueButton key={v} onClick={handleClick} label={v} value={v} />
          ))}
        </div>
      </div>
      <CustomTextbox
        displayValue={calevent.activity}
        handleInput={handleClick}
      />
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
      <div className="grid grid-rows-1">
        <ValueButton onClick={handleClick} label={'Park'} value="Park" />
        <ValueButton
          onClick={handleClick}
          label={'Common Room'}
          value="Common Room"
        />
      </div>
      <CustomTextbox
        displayValue={calevent.location}
        handleInput={handleClick}
      />
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
      <div className="grid grid-rows-2">
        <ValueButton onClick={handleClick} label={'Alice'} value="Alice" />
        <ValueButton onClick={handleClick} label={'Bob'} value="Bob" />
      </div>

      <CustomTextbox
        displayValue={calevent.participants.join(' ')}
        handleInput={handleClick}
      />
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
      <div className="grid grid-rows-2">
        <div className="flex">
          <ValueButton
            onClick={handleClick}
            label={'Tomorrow 2pm'}
            value={new Date(2024, 4, 31, 2).toString()}
          />
        </div>
        <div className="flex">
          <ValueButton
            onClick={handleClick}
            label={'Tomorrow 8pm'}
            value={new Date(2024, 4, 31, 8).toString()}
          />
        </div>
      </div>
    </>
  );
}

export default GeneralCreateEvent;
// export default ChooseActivity;
