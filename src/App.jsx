import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LandingPage from './Pages/LandingPage'
import HomePage from './Pages/HomePage';
import Layout from './Pages/Layout'
// import UserPage from './Pages/UserPage';
import PrivateRoute from './components/Registration/PrivateRoute';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LandingPage />} />
          {/* <Route path="/data" element={<UserPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
          {/* <Route path="/user" element={<PrivateRoute> <UserPage /> </PrivateRoute>} /> */}
        </Route>
      </Routes>
  );
}

export default App;
