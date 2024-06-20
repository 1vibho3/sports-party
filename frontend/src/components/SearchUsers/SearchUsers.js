import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';

const SearchUsers = () => {

    const [users, setUsers] = useState([]);

    const handleSearch = async (queryString) => {
        try{
            const token = sessionStorage.getItem('token'); 
            const response = await axios.get(`/userProfile/getUsers?query=${queryString}`,{
                headers: {
                    Authorization: `Bearer ${token}`  // Include token in the request header
                }
        });
            console.log('Response:', response.data);  // Debugging line            
            setUsers(response.data.data);
        }
        catch(err){
            console.error('Error fetching users', err);
        }
    }


    return (
        <div>
            <Navbar />
            <h1>User Search App</h1> 
            <SearchBar onSearch={handleSearch} />
        </div>
    );
};

export default SearchUsers;


