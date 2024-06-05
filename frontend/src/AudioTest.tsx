import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { ButtonComponent } from './ButtonComponent';
import { CalendarEvent } from '../types/CalendarEvent';
import { fileFromPath } from 'formdata-node/file-from-path';

const URL = 'http://127.0.0.1:5000/';

interface AudioBlobProps {
  audioBlobURL: string | null;
}

async function uploadAudio(props: AudioBlobProps) {
  console.log('Uploading');

  // Construct the form data to be sent
  // TODO: There is an error in this block of code preventing the audio being added
  const formData = new FormData();
  if (props.audioBlobURL !== null) {
    console.log(props.audioBlobURL);
    const audioBlob = await fetch(props.audioBlobURL).then((r) => r.blob());
    // const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
    formData.append('audio', audioBlob);
    // fetch(props.audioBlobURL).then((response) => {
    //   const blob = response.blob();
    //   blob.then((blob) => {
    //     formData.append('test', 'This is a test');
    //     formData.append('audio', blob);
    //   });
    // });
  } else {
    console.log('Error: blob url not present');
  }
  formData.append('test', 'This is a test');
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

const AudioRecorder: React.FC = () => {
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
    error,
    isAudioMuted
  } = useReactMediaRecorder({ audio: true });
  console.log(isAudioMuted);
  const audioBlobProps: AudioBlobProps = { audioBlobURL: mediaBlobUrl };
  return (
    <div>
      <p>Status: {status}</p>
      {error && <p>Error: {error}</p>}
      <br />
      <button onClick={startRecording}>Start Recording</button>
      <br />
      <button onClick={stopRecording}>Stop Recording</button>
      <br />
      {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
      <br />
      <button onClick={() => uploadAudio(audioBlobProps)}> Upload </button>
    </div>
  );
};

export function AudioTest() {
  return (
    <div>
      <h1>Audio Recorder</h1>
      <AudioRecorder />
    </div>
  );
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
  return <ButtonComponent label="Record" onClick={handleClick} />;
}
