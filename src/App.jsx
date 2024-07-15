import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LandingPage from './Pages/LandingPage'
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';
import PrivateRoute from './components/Registration/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/user" element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
