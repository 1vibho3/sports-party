// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: if you want to add custom styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/getMatch">Matches</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/createParty">Party</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/searchUsers">Friends</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/getFriendRequests">Requests</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
