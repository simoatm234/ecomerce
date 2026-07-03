import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/router';
import AuthInitializer from './AuthInitializer';

export default function App() {
  return (
    <div>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </div>
  );
}
