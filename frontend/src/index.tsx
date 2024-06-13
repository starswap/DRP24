import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { CreateEventScreen } from './CreateEvent/CreateEventScreen';
import { ThemeLogo } from './theme/ThemeLogo';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createHashRouter([
  { path: '', element: <Home /> },
  {
    path: 'create',
    element: <CreateEventScreen />
  }
]);

root.render(
  <React.StrictMode>
    <ThemeLogo />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
