import { useState } from 'react';
import { ButtonComponent, ValueButton } from '../ButtonComponent';
import { CalendarEvent } from '../../types/CalendarEvent';
import { doc, setDoc } from 'firebase/firestore';
import CustomTextbox from '../CustomTextbox';
import { db } from '../firebase';

const EMPTY_EVENT = {
  activity: '',
  participants: [],
  time: new Date(Date.now()),
  location: ''
};

type EventProps = {
  event: CalendarEvent;
  updateEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>;
};


function CreateEvent() {
  const [pageNum, setPageNum] = useState(0);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent>(EMPTY_EVENT);
  const PAGES = [What, Who, When, Where];

  const handleNext = () => {
    if (pageNum === PAGES.length - 1) {
      // Exit or something
      setDoc(doc(db, 'Events', 'myEvents'), currentEvent);
      console.log('Saved to DB');
    } else {
      setPageNum((pageNum) => pageNum + 1);
    }
  };

  const handleBack = () => {
    if (pageNum === 0) {
      console.log('Leaving activity page 0');
      // Exit or something
    } else {
      setPageNum((pageNum) => pageNum - 1);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4r p-2 w-full">
      <div>
        {PAGES[pageNum]({
          event: currentEvent,
          updateEvent: setCurrentEvent
        })}
      </div>
      <div>
        <ButtonComponent onClick={handleBack} label={'Back'} />
        <ButtonComponent
          onClick={handleNext}
          label={pageNum === PAGES.length - 1 ? 'Confirm' : 'Next'}
        />
      </div>
      <h2>Current activity</h2>
      {convertEvent(currentEvent)}
      <div />
    </div>
  );
}

function What({ event: calevent, updateEvent: updateActivity }: EventProps) {
  const handleClick = (event: any) => {
    const new_acc = { ...calevent, activity: event.target.value };
    updateActivity(new_acc);
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
function Where({ event: calevent, updateEvent: updateActivity }: EventProps) {
  const handleClick = (event: any) => {
    const new_acc = { ...calevent, location: event.target.value };
    updateActivity(new_acc);
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

function Who({ event: calevent, updateEvent: updateActivity }: EventProps) {
  const handleClick = (event: any) => {
    const new_acc = { ...calevent, participants: [event.target.value] };
    updateActivity(new_acc);
  };
  return (
    <>
      <h1>Who will you be doing it with?</h1>
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

function When({ event: calevent, updateEvent: updateActivity }: EventProps) {
  const handleClick = (event: any) => {
    console.log(event.target.value);
    const new_acc = {
      ...calevent,
      time: new Date(event.target.value)
    };
    updateActivity(new_acc);
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

export default CreateEvent;
