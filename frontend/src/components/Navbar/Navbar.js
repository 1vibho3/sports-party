// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css'; // Optional: if you want to add custom styles

const Navbar = ({onSearch}) => {
    const loggedInUserId = sessionStorage.getItem('userID');
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/getMatch">Matches</Link>
                </li>
                <li className="navbar-item">
                    <Link to={`/getUserProfile/${loggedInUserId}`}>My Profile</Link>
                </li>
                <div className="navbar-search">
                    <SearchBar onSearch={onSearch} />
                </div>
                <li className="navbar-item logout">
                    <Link to="/" onClick={()=> {
                        sessionStorage.clear();
                    }}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
