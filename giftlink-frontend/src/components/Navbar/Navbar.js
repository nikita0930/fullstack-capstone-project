import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            {/* Brand */}
            <Link className="navbar-brand" to="/app">
                GiftLink
            </Link>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                    {/* Home / Main */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/app">
                            Home
                        </Link>
                    </li>

                    {/* Gifts */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/app">
                            Gifts
                        </Link>
                    </li>

                    {/* Login (optional but useful) */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/app/login">
                            Login
                        </Link>
                    </li>

                    {/* Register (optional) */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/app/register">
                            Register
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}
