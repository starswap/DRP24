import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';
// import ButtonComponent from './ButtonComponent';

function GeneralCreateEvent() {
  // constructor(props) {
  //   super(props)
  //   this.state = {value: 'Please enter text.'}

  // }
  const PAGES = [What, Who, When, Where];
  const [pageNum, setPageNum] = useState(1);
  const [textBoxValue, setTextBoxValue] = useState('');
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

  function changeEvent() {
    currentActivity[pageNum] = textBoxValue;
    setCurrentActivity(currentActivity);
  }

  function displayEvent() {
    return <p>{currentActivity}</p>;
  }

  return (
    <>
      <div>{PAGES[pageNum]()}</div>
      <div>
        <input
          type="text"
          value={textBoxValue}
          onChange={(event) => setTextBoxValue(event.target.value)}
        />
      </div>
      <div>
        <ButtonComponent onClick={handleBack} label={'Back'} />
        <ButtonComponent onClick={handleNext} label={'Next'} />
      </div>
    </>
  );
}

function What() {
  const handleClick = () => {
    console.log('Clicked!');
  };
  return (
    <>
      <h1>What will you be doing</h1>
      <div className="flex-auto">
        <div className="flex flex-row flex-wrap w-full">
          <div className="flex flex-col basis-full flex-1">
            <ButtonComponent onClick={handleClick} label={'Walk'} />
            <ButtonComponent onClick={handleClick} label={'Walk'} />
            <ButtonComponent onClick={handleClick} label={'Walk'} />
          </div>
          <div className="flex flex-col basis-full flex-1">
            <ButtonComponent onClick={handleClick} label={'Walk'} />
            <ButtonComponent onClick={handleClick} label={'Walk'} />
            <ButtonComponent onClick={handleClick} label={'Walk'} />
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
// function Confirmation() {
//   return (
//     <div>
//       <h2>This is your current event, is this correct?</h2>
//       <displayEvent />
//     </div>
//   );
// }

// const Where = (props) => {
//   <h1></h1>
//   <CreateEvent Activity
// }

export default GeneralCreateEvent;
// export default ChooseActivity;
