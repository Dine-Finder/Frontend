import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting:', email, password); // Debug line
        try {
            const response = await axios.post('/api/signin', {
                username: email,
                password: password
            });
            console.log('Response:', response.data); // Debug line
            alert('Login successful!');
    
            // Store the token in local storage
            localStorage.setItem('token', response.data.access_token);
    
            // Redirect to home page
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message); // More detailed error logging
            alert('Login failed!');
        }
    };
    

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center py-12 px-10 h-full text-center">
            <h1 className="text-3xl font-bold mb-5" style={{ color: '#f47016' }}>Sign in</h1>
                <div className="social-container flex justify-center space-x-2 mb-5">
                    <a href="#" className="social border border-gray-300 rounded-full flex justify-center items-center mx-1 h-10 w-10">
                        <i className="fab fa-facebook-f"  style={{ color: '#f47016' }}/>
                    </a>
                    <a href="#" className="social border border-gray-300 rounded-full flex justify-center items-center mx-1 h-10 w-10">
                        <i className="fab fa-google-plus-g"  style={{ color: '#f47016' }}/>
                    </a>
                    <a href="#" className="social border border-gray-300 rounded-full flex justify-center items-center mx-1 h-10 w-10">
                        <i className="fab fa-linkedin-in"  style={{ color: '#f47016' }}/>
                    </a>
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                />
                <a href="#" className="text-sm text-gray-600 mb-5">Forgot your password?</a>
                <button type="submit" className="rounded-full border border-red-600 bg-red-600 text-white text-xs font-bold py-3 px-10 uppercase transition-transform transform hover:scale-95 focus:outline-none">
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default SignInForm;
