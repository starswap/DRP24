import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
// import ButtonComponent from './ButtonComponent';

function GeneralCreateEvent() {
  const PAGES = [What, Who, When, Where];
  const [pageNum, setPageNum] = useState(1);
  const [currentActivity, setCurrentActivity] = useState<Array<string>>([]);

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

  return (
    <>
      <div>{PAGES[pageNum]()}</div>
      <div>
        <ButtonComponent onClick={handleBack} label={'Back'} />
        <ButtonComponent onClick={handleNext} label={'Next'} />
      </div>
    </>
  );
}

function What() {
  return <h1>What</h1>;
}
function Who() {
  return <h1>Who</h1>;
}
function Where() {
  return <h1>Where</h1>;
}
function When() {
  return <h1>When</h1>;
}

// const Where = (props) => {
//   <h1></h1>
//   <CreateEvent Activity
// }

export default GeneralCreateEvent;
// export default ChooseActivity;
