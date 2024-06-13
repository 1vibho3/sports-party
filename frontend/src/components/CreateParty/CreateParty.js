import React, { useState } from 'react';
import axios from '../../axios/axios';

const CreateParty = () => {
  const [partyData, setPartyData] = useState({
    partyName: '',
    partyDate: '',
    partyLocation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartyData({ ...partyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = sessionStorage.getItem('userID');
      const partyDataWithUserId = {
        ...partyData,
        userId: userId // Assuming the API expects the user ID to be in a field named 'userId'
      };
      const response = await axios.post('/party/createParty', partyDataWithUserId);
      console.log('Party created successfully:', response.data);
      // Reset form after successful submission
      setPartyData({
        partyName: '',
        partyDate: '',
        partyLocation: ''
      });
    } catch (error) {
      console.error('Error creating party:', error);
    }
  };

  return (
    <div>
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
        <button type="submit">Create Party</button>
      </form>
    </div>
  );
};

export default CreateParty;
