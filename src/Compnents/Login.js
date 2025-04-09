import React, { useState } from 'react';
import '../input.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { login } from '../Redux/actions';


const apiUrl = process.env.REACT_APP_API_BASE_URL;
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async (e) => {
        e.preventDefault();
    
        const loginData = {
            email: email,
            password: password
        };
    
        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
    
            const data = await response.json(); // Parse the response body
            console.log('API Response:', data); // Check the actual response structure
    
            if (response.ok) {
                // Check if the expected data exists
                if (data.data.user.role) {
                    const token = data.token;
                    console.log('Token:', token);
                    const userRole = data.data.user.role;
                    console.log(userRole);
                    localStorage.setItem('token', token);
                    dispatch(login(userRole));
                    navigate('/admin/dashboard');
                } else {
                    setErrorMessage('Invalid response from server');
                }
            } else if (response.status === 401) {
                setErrorMessage('Invalid credentials');
            } else {
                setErrorMessage('An error occurred, please try again');
            }
        } catch (error) {
            setErrorMessage('Server error, please try again later');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-center text-gray-500 text-lg">
                        Sign in to your account
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="text-red-600 text-sm text-center">{errorMessage}</p>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
