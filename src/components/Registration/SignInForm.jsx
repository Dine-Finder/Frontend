import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { termsAndConditions } from '../../constants'
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!agreed) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must agree to the Terms and Conditions to sign in.',
      });
      return;
    }

    try {
      const response = await axios.post('/api/signin', {
        username: email,
        password: password
      });
      console.log('Response:', response.data);
      if (response.data.message && response.data.message.includes("verify your email")) {
        Swal.fire({
          icon: 'warning',
          title: 'Verify Email',
          text: 'Please verify your email before signing in.',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          text: 'You are now logged in.',
        });
        localStorage.setItem('token', response.data.access_token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response ? error.response.data.message : error.message,
      });
    }
  };

  return (
    <section className="box-border md:m-8 my-8 flex gap-4 font-display h-full relative">
      <div>
        <Link to="/" className="absolute z-10 left-10">
          <i className="fa-solid fa-landmark text-orange-500 text-2xl hover:scale-105 active:scale-95"></i>
        </Link>
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center mr-4">
        <div className="text-center mt-24">
          <Typography variant="h2" className="font-bold mb-4 font-display">Sign In</Typography>
          <Typography variant="paragraph" color="orange" className="text-lg font-normal font-display">Enter your email and password to Sign In.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 md:mx-auto w-80 max-w-screen-lg lg:w-1/2">
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
            <Typography variant="medium" color="white" className="-mb-3 font-medium font-display">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 font-display"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="medium"
                color="gray"
                className="flex items-center justify-start text-orange-300 font-medium font-display"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                  className="font-normal text-gray-500 transition-colors hover:text-gray-300 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5 font-display" }}
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <Button type="submit" className="mt-6 text-sm font-display bg-gradient-to-r from-orange-500 to-orange-300 hover:scale-105 active:scale-95" fullWidth>
            Sign In
          </Button>
          <div className="flex items-center justify-between gap-2 mt-6">
            <Checkbox
              label={
                <Typography
                  variant="medium"
                  color="gray"
                  className="flex items-center justify-start font-medium text-orange-300 font-display"
                >
                  Subscribe me to the newsletter
                </Typography>
              }
              containerProps={{ className: "-ml-2.5 font-display" }}
            />
            <Typography variant="medium" className="text-lg text-orange-900 hover:text-white font-display">
              <Link to="/forgot_password">
                Forgot Password
              </Link>
            </Typography>
          </div>
          <div className="space-y-4 mt-8">
            <Button type="submit" size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md font-display hover:scale-105 active:scale-95" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
            <Button type="submit" size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md font-display hover:scale-105 active:scale-95" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign in With Twitter</span>
            </Button>
          </div>
          <Typography variant="paragraph" className="text-center text-orange-500 text-lg mt-4 font-display">
            Not registered?
            <Link to="/register" className="text-white ml-1 font-display hover:text-red-500">Create account</Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-svh hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full rounded-3xl border-2 border-orange-500"
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-custom-dark p-8 rounded-lg border max-w-md w-[95vw]">
            <h2 className="text-xl font-bold text-orange-600 mb-4">Terms and Conditions</h2>
            <div className="mb-4 text-sm font-normal h-[70vh] overflow-scroll">
              <ReactMarkdown>{termsAndConditions}</ReactMarkdown>
            </div>
            <Button onClick={() => setIsModalOpen(false)} className="bg-orange-500 hover:bg-orange-600 text-white">
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default SignInForm;
