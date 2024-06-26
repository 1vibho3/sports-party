import React, { useState, useEffect } from 'react';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';
import Select from 'react-select';

const CreateParty = () => {
  const [partyData, setPartyData] = useState({
    partyName: '',
    partyDate: '',
    partyLocation: '',
    selectedUsers: [] // Initialize an empty array for selected user IDs
  });
  const [friends, setFriends] = useState([]); // Ensure friends is initialized as an empty array

  // Fetch friends when component mounts
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userId = sessionStorage.getItem('userID');
        const response = await axios.get(`/userProfile/getUserFriends/${userId}`);
        if (Array.isArray(response.data.data)) {
          setFriends(response.data.data.map(friend => ({ value: friend.userId, label: friend.username })));
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartyData({ ...partyData, [name]: value });
  };

  const handleUserSelection = (selectedOptions) => {
    setPartyData({ ...partyData, selectedUsers: selectedOptions ? selectedOptions.map(option => option.value) : [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = sessionStorage.getItem('userID');
      const partyDataWithUserId = {
        ...partyData,
        userId: userId
      };
      const response = await axios.post('/party/createParty', partyDataWithUserId);
      console.log('Party created successfully:', response.data);
      // Reset form after successful submission
      setPartyData({
        partyName: '',
        partyDate: '',
        partyLocation: '',
        selectedUsers: [] // Clear selected users after submission
      });
    } catch (error) {
      console.error('Error creating party:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Create a Party</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" name="partyName" value={partyData.partyName} onChange={handleChange} required />
        </div>
        <div>
          <label>Event Date:</label>
          <input type="date" name="partyDate" value={partyData.partyDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="partyLocation" value={partyData.partyLocation} onChange={handleChange} required />
        </div>
        <div>
          <label>Select Users to Invite:</label>
          <Select
            isMulti
            options={friends}
            onChange={handleUserSelection}
            value={friends.filter(friend => partyData.selectedUsers.includes(friend.value))}
          />
        </div>
        <button type="submit">Create Party</button>
      </form>
    </div>
  );
};

export default CreateParty;
