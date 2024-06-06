import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { ThemeButton } from '../theme/ThemeButton';
import { CalendarEvent } from '../types/CalendarEvent';

const URL = 'http://127.0.0.1:5000/';

// Function packages audio blob and sends it to globally defined URL
async function uploadAudio(blobUrl: string) {
  console.log('Uploading');

  // Construct the form data to be sent
  const formData = new FormData();
  if (blobUrl !== null) {
    const audioBlob = await fetch(blobUrl).then((r) => r.blob());
    formData.append('audio', audioBlob);
  } else {
    console.log('Error: blob url not present');
  }

  // Send the form data
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
    return response.data.text.text;
  } catch (error) {
    console.log(`Error: ${error}`);
  } finally {
    console.log('Cleaning up!');
  }
}

export function AudioRecordButton({
  saveActivity
}: {
  saveActivity: (activity: string) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState('');

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
        const response = await uploadAudio(mediaBlobUrl);
        console.log(`Server Response: ${response}`);
        saveActivity(response);
      };
      upload();
    }
  }, [mediaBlobUrl]);

  const handleClick = () => {
    if (recording) {
      // Stop
      console.log('Stopping Recording');
      stopRecording();
      setRecording(false);
    } else {
      // Start
      console.log('Starting Recording');
      startRecording();
      setRecording(true);
    }
  };

  return <ThemeButton onClick={handleClick}> Record </ThemeButton>;
}
