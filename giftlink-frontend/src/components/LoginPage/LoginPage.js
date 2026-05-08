import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

export default function LoginPage() {

    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');

    // Navigation and Context
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    // Redirect if already logged in
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate]);

    // Handle Login Function
    const handleLogin = async () => {

        try {

            // API Call
            const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {

                method: 'POST',

                headers: {
                    'content-type': 'application/json',
                    'Authorization': bearerToken
                        ? `Bearer ${bearerToken}`
                        : '',
                },

                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            // Access JSON data
            const json = await res.json();

            // Successful Login
            if (json.authtoken) {

                // Store user details
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);

                // Set logged in state
                setIsLoggedIn(true);

                // Navigate to MainPage
                navigate('/app');

            } else {

                // Clear inputs
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";

                // Show error message
                setIncorrect("Wrong password. Try again.");

                // Clear message after 2 seconds
                setTimeout(() => {
                    setIncorrect("");
                }, 2000);
            }

        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    };

    return (
        <div className="container mt-5">

            <h2 className="mb-4">Login</h2>

            {/* Email Input */}
            <div className="mb-3">
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Password Input */}
            <div className="mb-3">
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Error Message */}
            <span
                style={{
                    color: 'red',
                    height: '.5cm',
                    display: 'block',
                    fontStyle: 'italic',
                    fontSize: '12px'
                }}
            >
                {incorrect}
            </span>

            {/* Login Button */}
            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Login
            </button>

        </div>
    );
}
