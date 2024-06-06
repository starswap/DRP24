import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { ThemeButton } from '../theme/ThemeButton';
import { CalendarEvent } from '../types/CalendarEvent';

const URL = 'http://127.0.0.1:5000/';

interface AudioBlobProps {
  audioBlobURL: string | null;
}

// Function packages audio blob and sends it to globally defined URL
async function uploadAudio(props: AudioBlobProps) {
  console.log('Uploading');

  // Construct the form data to be sent
  const formData = new FormData();
  if (props.audioBlobURL !== null) {
    console.log(props.audioBlobURL);
    const audioBlob = await fetch(props.audioBlobURL).then((r) => r.blob());
    formData.append('audio', audioBlob);
  } else {
    console.log('Error: blob url not present');
  }

  console.log(formData);
  // Send the form data
  axios
    .post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response.data.hello);
      return response;
    })
    .catch(function (error) {
      console.log(`Error: ${error}`);
    })
    .finally(function () {
      console.log('Cleaning up!');
    });
}

export function AudioRecordButton({
  activitySetter
}: {
  activitySetter: (a: CalendarEvent) => void;
}) {
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
    error,
    isAudioMuted
  } = useReactMediaRecorder({ audio: true });
  console.log(isAudioMuted);

  const [recording, setRecording] = useState(false);
  const handleClick = () => {
    if (recording) {
      // Stop
      console.log('Stopping Recording');
      stopRecording();
      setRecording(false);
      const audioBlobProps: AudioBlobProps = { audioBlobURL: mediaBlobUrl };
      const response = uploadAudio(audioBlobProps);
      console.log(`Server Response: ${response}`);
    } else {
      // Start
      console.log('Starting Recording');
      startRecording();
      setRecording(true);
    }
  };
  return <ThemeButton onClick={handleClick}> Record </ThemeButton>;
}
