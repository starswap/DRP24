import { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder-2';
import axios, { Axios, AxiosResponse } from 'axios';
import { ThemeButton } from '../theme/ThemeButton';
import { CalendarEvent } from '../types/CalendarEvent';
import { MultiPageFormStateProps } from '../MultiPageForm/MultiPageForm';
const AUDIO_START_TEXT = 'Press to speak answer';
// If developing locally use set LOCAL env var
// const URL =
//   (process.env.LOCAL ? 'http://127.0.0.1:5000/' : '/');

const URL = 'http://127.0.0.1:5000/' + 'api/post_conversation';

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

  const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      setMediaBlobUrl(blobUrl);
    }
  });

  function updateConversationState(response: AxiosResponse) {
    let new_state = state;
    // Check for each field in the response and update the state accordingly
    if ('activity' in response && response['activity'] !== 'NA') {
      new_state = { ...new_state, activity: response.data['activity'] };
    }
    if ('location' in response && response['location'] !== 'NA') {
      new_state = { ...new_state, location: response.data['location'] };
    }
    if ('people' in response) {
      new_state = { ...new_state, participants: response.data['people'] };
    }
    if ('time' in response && response['time'] !== 'NA') {
      new_state = { ...new_state, time: response.data['time'] };
    }
    updateState(new_state);
  }

  useEffect(() => {
    if (mediaBlobUrl) {
      const upload = async () => {
        console.log(`Uploading audio to server: ${mediaBlobUrl}`);
        // Check if we are recording a conversation or a specific subject
        const response = await uploadAudio(mediaBlobUrl);
        if (response !== undefined) {
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
