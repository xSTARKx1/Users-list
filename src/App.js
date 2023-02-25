import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Users, Posts } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='/posts/:userId' element={<Posts />} />
        <Route path='*' element={<Navigate to={'/users'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
