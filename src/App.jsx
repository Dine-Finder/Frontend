import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInForm from './components/Registration/SignInForm';
import SignUpForm from './components/Registration/SignUpForm';
import ForgotPasswordForm from './components/Registration/ForgotPasswordForm'; 
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
          <Route path="/login" element={<SignInForm />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="/forgot_password" element={<ForgotPasswordForm />} />
          <Route path="/home" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
          {/* <Route path="/user" element={<PrivateRoute> <UserPage /> </PrivateRoute>} /> */}
        </Route>
      </Routes>
  );
}

export default App;
