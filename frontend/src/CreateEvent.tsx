import React, { useState } from 'react';
import { ButtonComponent, ValueButton } from './ButtonComponent';

function GeneralCreateEvent() {
  const PAGE_ACTIVITY_DESC = [
    'You are doing: ',
    'with: ',
    'at time: ',
    'at place: '
  ];
  const [pageNum, setPageNum] = useState(0);
  const [textBoxValue, setTextBoxValue] = useState('');
  const [currentActivity, setCurrentActivity] = useState<Array<string>>([]);
  const PAGES = [
    () =>
      What({
        arr: currentActivity,
        ind: 0,
        activitySetter: setCurrentActivity
      }),
    Who,
    When,
    Where
  ];

  function handleNext() {
    setTextBoxValue('');
    if (pageNum === PAGES.length - 1) {
      // Exit or something
      console.log('Finished activity');
    } else {
      setPageNum(pageNum + 1);
    }
  }

  function handleBack() {
    setTextBoxValue('');
    if (pageNum === 0) {
      console.log('Leaving activity page 0');
      // Exit or something
    } else {
      setPageNum(pageNum - 1);
    }
  }
  const isLastPage = pageNum === PAGES.length;
  return (
    <>
      <div>{PAGES[pageNum]()}</div>
      <div>
        <input
          type="text"
          value={textBoxValue}
          onChange={(event) => {
            setTextBoxValue(event.target.value);
            const new_arr = [...currentActivity];
            new_arr[pageNum] = event.target.value;
            setCurrentActivity(new_arr);
          }}
        />
      </div>
      <div>
        <ButtonComponent onClick={handleBack} label={'Back'} />
        <ButtonComponent
          onClick={handleNext}
          label={isLastPage ? 'Confirm' : 'Next'}
        />
      </div>
      <h2> Current activity</h2>
      {PAGE_ACTIVITY_DESC.map((a, i) => (
        <p key={i}>
          {a + (i < currentActivity.length ? currentActivity[i] : '')}
        </p>
      ))}
      <div />
    </>
  );
}

function What({
  arr,
  ind,
  activitySetter
}: {
  arr: Array<string>;
  ind: number;
  activitySetter: (arr: Array<string>) => void;
}) {
  const handleClick = (event: any) => {
    console.log('HERE!');
    const new_arr = [...arr];
    new_arr[ind] = event.target.value;
    activitySetter(new_arr);
  };
  return (
    <>
      <h1>What will you be doing</h1>
      <div className="flex-auto">
        <div className="flex flex-row flex-wrap w-full">
          <div className="flex flex-col basis-full flex-1">
            <ValueButton onClick={handleClick} label={'Walk'} value="Walk" />
            <ValueButton onClick={handleClick} label={'Walk'} value="walk" />
            <ValueButton onClick={handleClick} label={'Walk'} value="walk" />
          </div>
          <div className="flex flex-col basis-full flex-1">
            <ValueButton onClick={handleClick} label={'Walk'} value="walk" />
            <ValueButton onClick={handleClick} label={'Walk'} value="walk" />
            <ValueButton onClick={handleClick} label={'Walk'} value="walk" />
          </div>
        </div>
      </div>
    </>
  );
}
function Who() {
  return <h2>Who would you like to do it with?</h2>;
}
function Where() {
  return <h2>Where would you like to do it?</h2>;
}
function When() {
  return <h2>When would you like to do it?</h2>;
}

export default GeneralCreateEvent;
// export default ChooseActivity;
