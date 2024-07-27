import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactMarkdown from 'react-markdown';
import { termsAndConditions } from '../../constants';
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignUpForm() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, agreeToTerms } = state;

    if (!name.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Name Required',
        text: 'Name field cannot be blank.'
      });
      return;
    }

    if (!email.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Email Required',
        text: 'Email field cannot be blank.'
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords Mismatch',
        text: 'Passwords do not match!'
      });
      return;
    }

    if (!agreeToTerms) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms and Conditions',
        text: 'You must agree to the Terms and Conditions to register.'
      });
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        username: name,
        email: email,
        password: password
      });
      console.log('Response:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Registration successful! Please check your email to confirm your registration.'
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data.message : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    }
  };

  return (
    <section className="box-border md:m-8 my-8 flex flex-row-reverse gap-4 font-display h-full">
      <div>
        <Link to="/" className="absolute z-10 right-10">
          <i className="fa-solid fa-landmark text-orange-500 text-2xl hover:scale-105 active:scale-95"></i>
        </Link>
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center ml-4">
        <div className="text-center mt-10">
          <Typography variant="h2" className="font-bold mb-4 font-display">Join Us Today</Typography>
          <Typography variant="paragraph" color="orange" className="text-lg font-normal font-display">Enter your details to register.</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 md:mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="medium" color="white" className="-mb-3 font-medium font-display">
              Name
            </Typography>
            <Input
              size="lg"
              placeholder="Full Name"
              name="name"
              value={state.name}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 font-display"
            />
            <Typography variant="medium" color="white" className="-mb-3 font-medium font-display">
              Email
            </Typography>
            <Input
              type="email"
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 font-display"
            />
            <Typography variant="medium" color="white" className="-mb-3 font-medium font-display">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 font-display"
            />
            <Typography variant="medium" color="white" className="-mb-3 font-medium font-display">
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 font-display"
            />
          </div>
          <div className="flex items-center justify-between gap-2 mt-6">
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
              checked={state.agreeToTerms}
              onChange={handleChange}
              name="agreeToTerms"
            />
          </div>
          <Button type="submit" className="mt-6 text-sm font-display bg-gradient-to-r from-orange-500 to-orange-300 hover:scale-105 active:scale-95" fullWidth>
            Register Now
          </Button>
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
              <span>Sign up With Google</span>
            </Button>
            <Button type="submit" size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md font-display hover:scale-105 active:scale-95" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign up With Twitter</span>
            </Button>
          </div>
          <Typography variant="paragraph" className="text-center text-orange-500 text-lg mt-4 font-display">
            Already have an account?
            <Link to="/login" className="text-white hover:text-red-500 ml-1 font-display">Sign in</Link>
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

export default SignUpForm;
