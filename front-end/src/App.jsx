import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/router';
import AuthInitializer from './AuthInitializer';
import GlobalAlert from './Components/GlobalAlert';

export default function App() {
  return (
    <div>
      <AuthInitializer>
        <GlobalAlert />
        <RouterProvider router={router} />
      </AuthInitializer>
    </div>
  );
}
