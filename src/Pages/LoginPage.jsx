import React, { useState, useEffect } from 'react';
import SignInForm from '../components/Registration/SignInForm';
import SignUpForm from '../components/Registration/SignUpForm';
import Navbar from "../components/LandingPage/NavbarLogin";
import '../styles/LoginPage/LoginPage.css';

function LoginPage() {
    const [isSigningIn, setIsSigningIn] = useState(true);

    // Reset the state when the component mounts
    useEffect(() => {
        setIsSigningIn(true);
    }, []); // The empty array ensures this effect runs only once after the component mounts.

    const handleOnClick = (text) => {
        if (text !== (isSigningIn ? 'signIn' : 'signUp')) {
            setIsSigningIn(!isSigningIn);
            return;
        }
    };

    const containerClass = `container ${!isSigningIn ? 'right-panel-active' : ''}`;

    return (
            <>
                <Navbar />
                <div className="login-page">
                    <h2 className="text-2xl font-bold mb-5">Join Us</h2>
                    <div className={containerClass} id="container">
                        {isSigningIn ? <SignInForm /> : <SignUpForm />}
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1 className="text-3xl font-bold">Welcome Back!</h1>
                                    <p className="mt-2">
                                        To keep connected with us please login with your personal info
                                    </p>
                                    <button
                                        className="ghost bg-transparent border border-white text-white py-2 px-4 rounded-full mt-5"
                                        id="signIn"
                                        onClick={() => handleOnClick('signIn')}
                                    >
                                        Sign In
                                    </button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1 className="text-3xl font-bold">Hello, Friend!</h1>
                                    <p className="mt-2">Enter your personal details and start journey with us</p>
                                    <button
                                        className="ghost bg-transparent border border-white text-white py-2 px-4 rounded-full mt-5"
                                        id="signUp"
                                        onClick={() => handleOnClick('signUp')}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default LoginPage;
