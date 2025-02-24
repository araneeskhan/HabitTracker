import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ModernHabitTracker from './components/ModernHabitTracker';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ModernHabitTracker />,
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;