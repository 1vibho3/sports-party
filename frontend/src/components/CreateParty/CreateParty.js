import React, { useState, useEffect } from 'react';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';
import Select from 'react-select';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import LocationPicker from '../LocationPicker/LocationPicker';
import './CreateParty.css';

const CreateParty = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {homeTeam, awayTeam, partyDate} = location.state || {};

  const [partyData, setPartyData] = useState({
    partyName: `${homeTeam} vs ${awayTeam}`,
    partyDate: partyDate || '',
    partyLocation: '',
    selectedUsers: [] ,
    note: ''
  });
  const [friends, setFriends] = useState([]); 
  
  
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

  const handleLocationChange = (location) => {
    setPartyData({ ...partyData, partyLocation: location });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = sessionStorage.getItem('userID');
      const partyDataWithUserId = {
        ...partyData,
        userId: userId
      };

      console.log(partyDataWithUserId);
      const response = await axios.post('/party/createParty', partyDataWithUserId);
      console.log('Party created successfully:', response.data);
      // Reset form after successful submission
      setPartyData({
        partyName: '',
        partyDate: '',
        partyLocation: '',
        note: '',
        selectedUsers: [] // Clear selected users after submission
      });
      navigate(`/getMatch`);
    } catch (error) {
      console.error('Error creating party:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className ="party-form">
        <div className = "form-item">
          <label className = "form-item-label">Event</label>
          <input type="text" name="partyName" className="form-input" value={partyData.partyName} onChange={handleChange} required />
        </div>
        <div className = "form-item">
          <label className = "form-item-label">Date</label>
          <input type="text" name="partyDate" className="form-input" value={partyData.partyDate} onChange={handleChange} required />
        </div>
        <div className = "form-item">
          <label className = "form-item-label">Location:</label>
          <LocationPicker className = "form-location" onLocationChange={handleLocationChange} />
          {/* <input type="text" name="partyLocation" className="form-input" value={partyData.partyLocation} onChange={handleChange} required /> */}
        </div>
        <div className = "form-item">
          <label className = "form-item-label">Select Users to Invite:</label>
          <Select
            isMulti
            options={friends}
            onChange={handleUserSelection}
            value={friends.filter(friend => partyData.selectedUsers.includes(friend.value))}
          />
        </div>
        <div  className = "form-item">
          <label className = "form-item-label">Note</label>
          <input type="text" name="note"  className="form-input" value={partyData.note} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Create Party</button>
        <Link to="/getMatch">
            <button className="cancel-button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateParty;
