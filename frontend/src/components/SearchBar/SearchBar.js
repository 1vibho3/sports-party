import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
// import '../Navbar/Navbar.css'; 

const SearchBar = ({ onSearch }) => {
    const [queryString, setQueryString] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = async (event) => {
        const query = event.target.value;
        setQueryString(query);

        if (query.length > 0) {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`/userProfile/getUsers?query=${query}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuggestions(response.data.data);
            } catch (err) {
                console.error('Error fetching users', err);
            }
        } else {
            setSuggestions([]);
        }

        if (onSearch) {
            onSearch(query);
        }
    };

    const handleSuggestionClick = (userId) => {
        setQueryString('');
        setSuggestions([]);
        navigate(`/getUserProfile/${userId}`);
    };

    return (
        <div className="search-bar">
            <input 
                type="search" 
                placeholder="Search users..." 
                value={queryString} 
                onChange={handleInputChange} 
                className="search-input"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((user, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(user.userId)} className="suggestion-item">
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
