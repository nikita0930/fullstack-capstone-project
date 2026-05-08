import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Task 3
import { urlConfig } from '../../config'; // Task 1
import { useAppContext } from '../../context/AuthContext'; // Task 2

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 4
    const [incorrect, setIncorrect] = useState('');

    // Task 5
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    // Task 6
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {

            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                
                // Task 7
                method: 'POST',

                // Task 8
                headers: {
                    'content-type': 'application/json',
                    'Authorization': bearerToken
                        ? `Bearer ${bearerToken}`
                        : '',
                },

                // Task 9
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('auth-token', data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user));

                setIsLoggedIn(true);

                navigate('/app');
            } else {
                setIncorrect('Incorrect email or password');
            }

        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>

            {incorrect && <p>{incorrect}</p>}
        </div>
    );
}
