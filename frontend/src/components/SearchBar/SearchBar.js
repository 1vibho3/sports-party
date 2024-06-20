import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';

const SearchBar = () => {
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
                        Authorization: `Bearer ${token}`  // Include token in the request header
                    }
            });
                setSuggestions(response.data.data);
            } catch (err) {
                console.error('Error fetching users', err);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (userId) => {
        setQueryString('');
        setSuggestions([]);
        navigate(`/getUserProfile/${userId}`);
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search users..." 
                value={queryString} 
                onChange={handleInputChange} 
            />
            <ul>
                {suggestions.map((user, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(user.userId)}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
