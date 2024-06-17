import { useState, useEffect, useRef } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import axios, { Axios, AxiosResponse } from 'axios';
import { ThemeButton } from '../theme/ThemeButton';
import { CalendarEvent, EventResponse } from '../types/CalendarEvent';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
import {
  createEvent,
  createEventMeta,
  fetchUsers,
  getCurrentUser
} from '../util/data';
import { Reschedule } from '../Home';
import { useNavigate } from 'react-router-dom';
import { EMPTY_EVENT } from './CreateConversationScreen';
import { PersonMap } from '../types/Person';
const AUDIO_START_TEXT = 'Press to speak answer';

// If developing locally use set LOCAL env var
// const URL =
//   (process.env.LOCAL ? 'http://127.0.0.1:5000/' : '/');

const URL = 'http://192.168.0.26:5000/' + 'api/post_conversation';

// Function packages audio blob and sends it to globally defined URL
async function uploadAudio(blobUrl: string) {
  // Construct the form data to be sent
  const formData = new FormData();
  if (blobUrl !== null) {
    const audioBlob = await fetch(blobUrl).then((r) => r.blob());
    formData.append('audio', audioBlob);
  } else {
    console.error('Error: blob url not present');
  }

  console.log(`Uploading to ${URL}`);
  // Send the form data
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(`Error: ${error}`);
  } finally {
    console.log('Cleaning up!');
  }
}

export function ConversationRecordButton({
  updateState,
  state
}: MultiPageFormStateProps<CalendarEvent>) {
  const [recording, setRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState('');
  const [buttonText, setButtonText] = useState(AUDIO_START_TEXT);
  const navigate = useNavigate();
  const startRef = useRef(Date.now());
  const [recorded, setRecorded] = useState(false);
  const [people, setPeople] = useState<PersonMap>({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const confirm = (currentEvent: CalendarEvent) => {
    const time_taken = Date.now() - startRef.current;
    console.log(`Time taken: ${time_taken}`);
    createEvent(currentEvent).then((eventUID) => {
      createEventMeta(eventUID, time_taken);
      // set notification of rescheduling for when event starts
      const notifyTime = currentEvent.time;
      setTimeout(
        () => Reschedule(currentEvent, eventUID),
        notifyTime.getTime() - Date.now()
      );
    });
    navigate('/', { state: { confetti: true } });
  };

  // Use the react media recorder to record audio
  const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      setMediaBlobUrl(blobUrl);
    }
  });

  // Update the state of the conversation based on the response from the server
  function updateConversationState(response: AxiosResponse) {
    let new_state = state;
    // Check for each field in the response and update the state accordingly
    // If activity is not present, set it to 'Something'
    if ('activity' in response.data && response.data['activity'] !== 'NA') {
      new_state = { ...new_state, activity: response.data['activity'] };
    } else {
      console.error('Error: activity not present in response');
      new_state = { ...new_state, activity: 'Something' };
    }
    // If place is not present, set it to 'Somewhere'
    if ('place' in response.data && response.data['place'] !== 'NA') {
      new_state = { ...new_state, location: response.data['place'] };
    } else {
      console.error('Error: place not present in response');
      new_state = { ...new_state, location: 'Somewhere' };
    }
    // If people are not present do nothing as already set defaults
    if ('people' in response.data) {
      // Cycle through all users in response and add them to the event
      for (const personOneName of response.data['people']) {
        for (const [id, personTwo] of Object.entries(people)) {
          // Check if the person is in the list of people
          if (
            personTwo.name.firstname.toLowerCase() ===
            personOneName.toLowerCase()
          ) {
            console.log(`Found: ${personTwo.name.firstname}`);
            // We shouldn't need to edit so there should only be one version of each person
            new_state = {
              ...new_state,
              participants: new_state.participants.concat([id]),
              statuses: {
                ...new_state.statuses,
                [id]: { person: personTwo, response: EventResponse.UNKNOWN }
              }
            };
          }
        }
      }
    } else {
      console.error('Error: people not present in response');
    }
    // If time is not present, set it to tomorrow
    if ('time' in response.data && response.data['time'] !== 'NA') {
      const time = new Date(response.data['time']);
      new_state = { ...new_state, time: time };
    } else {
      console.error('Error: time not present in response');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1); // set the date to tomorrow
      new_state = { ...new_state, time: tomorrow };
    }
    console.log('New state updated');
    console.log(new_state);
    updateState(new_state);
  }
  // Add the current user to the event automatically and have them accept it
  useEffect(() => {
    const curr = getCurrentUser();
    if (curr in people) {
      // if all users fetched
      updateState((oldState) => ({
        ...oldState,
        participants: oldState.participants.concat([curr]),
        statuses: {
          ...oldState.statuses,
          [curr]: { person: people[curr], response: EventResponse.ACCEPTED }
        }
      }));
    }
    console.log('Current User added to event');
    console.log(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people]);

  // Fetch users from the database
  useEffect(() => {
    fetchUsers().then(setPeople);
    console.log('Fetched users');
    console.log(people);
  }, []);

  // When the mediaBlobUrl is updated, upload the audio to the server
  useEffect(() => {
    if (mediaBlobUrl) {
      const upload = async () => {
        console.log(`Uploading audio to server: ${mediaBlobUrl}`);
        // Check if we are recording a conversation or a specific subject
        const response = await uploadAudio(mediaBlobUrl);
        if (response !== undefined) {
          setRecorded(true);
          updateConversationState(response);
        } else {
          console.error('Error: response is undefined');
        }
        console.log(`Server Response: ${response}`);
      };
      upload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaBlobUrl]);

  // When the conversation is finished recording, confirm the conversation
  useEffect(() => {
    console.log(state);
    if (recorded) {
      confirm(state);
    }
  }, [confirm, recorded, state]);

  // When the button is clicked, start or stop recording
  const handleClick = () => {
    if (recording) {
      // Stop
      console.log('Stopping Recording');
      stopRecording();
      setRecording(false);
      setButtonText(AUDIO_START_TEXT);
    } else {
      // Start
      console.log('Starting Recording');
      startRecording();
      setRecording(true);
      setButtonText('Stop');
    }
  };

  // change button text based on recording state
  return <ThemeButton onClick={handleClick}> {buttonText} </ThemeButton>;
}
