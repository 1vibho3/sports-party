import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import axios from '../../axios/axios';

const SearchUsers = () => {

    const [users, setUsers] = useState([]);

    const handleSearch = async (queryString) => {
        try{
            const response = await axios.get(`/userProfile/getUsers?query=${queryString}`);
            console.log(response);
            console.log(response.data.data);
            
            setUsers(response.data.data);
        }
        catch(err){
            console.error('Error fetching users', err);
        }
    }


    return (
        <div>
            <h1>User Search App</h1> 
            <SearchBar onSearch={handleSearch} />
        </div>
    );
};

export default SearchUsers;


