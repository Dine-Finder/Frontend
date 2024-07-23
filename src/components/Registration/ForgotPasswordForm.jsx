import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/forgot_password', { email });
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: 'Password reset email sent successfully.'
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error sending reset email: ' + (error.response ? error.response.data.message : error.message)
      });
    }
  };

  return (
    <section className="box-border m-8 flex gap-4 font-display h-screen">
      <div>
        <Link to="/" className="absolute z-10 left-10">
          <i className="fa-solid fa-landmark text-orange-500 text-2xl hover:scale-105 active:scale-95"></i>
        </Link>
      </div>
      <div className="w-full lg:w-3/5">
        <div className="text-center mt-24">
          <Typography variant="h2" className="font-bold mb-4 font-display">Forgot Password</Typography>
          <Typography variant="paragraph" color="orange" className="text-lg font-normal font-display">Enter your email to reset your password.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="medium" color="white" className="-mb-3 font-medium font-display">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 font-display"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-6 text-sm font-display bg-gradient-to-r from-orange-500 to-orange-300 hover:scale-105 active:scale-95" fullWidth>
            Send Reset Email
          </Button>
        </form>
      </div>
      <div className="w-2/5 h-svh hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full rounded-3xl border-2 border-orange-500"
        />
      </div>
    </section>
  );
}

export default ForgotPasswordForm;
