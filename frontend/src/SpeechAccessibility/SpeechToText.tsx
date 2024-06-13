import { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { ThemeButton } from '../theme/ThemeButton';
const AUDIO_START_TEXT = 'Press to speak answer';
// If developing locally use set LOCAL env var
const URL =
  (process.env.LOCAL ? 'http://127.0.0.1:5000/' : '/') + 'api/post_audio';

// Function packages audio blob and sends it to globally defined URL
async function uploadAudio(blobUrl: string, subject: string) {
  console.log('Uploading');

  // Construct the form data to be sent
  const formData = new FormData();
  if (blobUrl !== null) {
    const audioBlob = await fetch(blobUrl).then((r) => r.blob());
    formData.append('audio', audioBlob);
  } else {
    console.log('Error: blob url not present');
  }

  // Add the subject to the form data
  formData.append('subject', subject);

  // Send the form data
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    return response.data[subject];
  } catch (error) {
    console.log(`Error: ${error}`);
  } finally {
    console.log('Cleaning up!');
  }
}

export function AudioRecordButton({
  saveActivity,
  subject
}: {
  saveActivity: (activity: string) => void;
  subject: string;
}) {
  const [recording, setRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState('');
  const [buttonText, setButtonText] = useState(AUDIO_START_TEXT);

  const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      setMediaBlobUrl(blobUrl);
    }
  });

  useEffect(() => {
    if (mediaBlobUrl) {
      const upload = async () => {
        console.log(`Uploading audio to server: ${mediaBlobUrl}`);
        const response = await uploadAudio(mediaBlobUrl, subject);
        console.log(`Server Response: ${response}`);
        saveActivity(response);
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
