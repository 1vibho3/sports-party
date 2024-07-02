import React, { useState } from 'react';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';

const SearchUsers = () => {
    const [users, setUsers] = useState([]);

    const handleSearch = async (queryString) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(`/userProfile/getUsers?query=${queryString}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
            setUsers(response.data.data);
        } catch (err) {
            console.error('Error fetching users', err);
        }
    };

    return (
        <div>
            <Navbar onSearch={handleSearch} />
        </div>
    );
};

export default SearchUsers;
