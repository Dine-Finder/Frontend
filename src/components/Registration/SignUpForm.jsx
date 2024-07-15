import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function SignUpForm() {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
    
        const { name, email, password, confirmPassword } = state;
    
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        try {
            const response = await axios.post('/api/register', {
                username: name,
                email: email,
                password: password
            });
    
            if (response.status === 201) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data.message : error.message);
            alert(error.response ? error.response.data.message : 'Registration failed!');
        }
    
        setState({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };
    

    return (
        <div className="form-container sign-up-container">
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
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                />
                <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="bg-gray-200 border-none py-3 px-4 my-2 w-full"
                />
                <button type="submit" className="rounded-full border border-red-600 bg-red-600 text-white text-xs font-bold py-3 px-10 uppercase transition-transform transform hover:scale-95 focus:outline-none mt-5">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUpForm;
