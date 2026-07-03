import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/router';
import { api } from './app/lib/Api';
import axios from 'axios';

export default function App() {
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
