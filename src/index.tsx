import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import ErrorPage from "./components/ErrorPage";
import { DataProvider } from './contexts/DataContext';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Starship from './components/Starship';
import Dashboard from './components/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "starships/",
        element: <Dashboard />,
      },
      {
        path: "pilots/",
        element: <Dashboard />,
      },
      {
        path: "starship/:starshipId",
        element: <Starship />,
      },
      {
        path: "pilot/:pilotsId",
        element: <Starship />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
