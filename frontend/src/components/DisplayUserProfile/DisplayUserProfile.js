import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios/axios'; // Adjust the path as per your project structure
import Navbar from '../Navbar/Navbar';
import './DisplayUserProfile.css'

const UserProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const loggedInUserId = sessionStorage.getItem('userID');
    const [userProfile, setUserProfile] = useState(null);
    const [parties, setParties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requestStatus, setRequestStatus] = useState("Send Request");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found in sessionStorage');
                }
                const response = await axios.get(`/userProfile/getUser/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserProfile(response.data.data);
                await fetchParties();
                await fetchRequestStatus();
            } catch (err) {
                setError('Error fetching user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const fetchParties = async () => {
        try {
            const response = await axios.get(`/userProfile/getParty/${userId}`);
            
            const partiesData = response.data.data.map(item => item.data);
            setParties(partiesData); // Adjust according to your API response structure
        } catch (err) {
            console.error('Error fetching parties:', err);
            setParties([]);
        }
    };

    const fetchRequestStatus = async () => {
        try {
            const response = await axios.get(`/friends/getFriendRequestStatus/${loggedInUserId}/${userId}`);
            const status = response.data.data;
            if (status === "pending")
                setRequestStatus("pending");
            else if (status === "accepted")
                setRequestStatus("Unfriend");
            else
                setRequestStatus("Send Request");
        } catch (err) {
            console.error('Error fetching request status:', err);
        }
    };

    const handleRequestClick = async () => {
        try {
            if (requestStatus === "Send Request") {
                const payload = { requestFromUserId: loggedInUserId, requestToUserId: userId };
                const response = await axios.post(`/friends/sendRequest/`, payload);
                setRequestStatus("pending");
            } else if (requestStatus === "pending") {
                const payload = { requestFromUserId: loggedInUserId, requestToUserId: userId };
                const response = await axios.delete(`/friends/deleteRequest/`, { data: payload });
                setRequestStatus("Send Request");
            } else if (requestStatus === "Unfriend") {
                const payload = { requestFromUserId: loggedInUserId, requestToUserId: userId };
                const response = await axios.delete(`/friends/deleteFriend/`, { data: payload });
                setRequestStatus("Send Request");
            }
        } catch (err) {
            console.error('Error Sending request:', err);
        }
    };

    const handleSuggestionClick = (userId) => {
        navigate(`/getUserProfile/${userId}`);
    };

    const handleCancelonClick = async (partyId) => {
        try{
            await axios.delete(`/party/deleteParty/${partyId}`);
            fetchParties();
        }
        catch(error){
            console.error('Error Cancelling Party', error);
        }
        
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar />
            {userProfile ? (
                <div className="container">
                    <div className="user-profile">
                        <h1>{userProfile.username}</h1>
                        {(userProfile.userId !== loggedInUserId &&
                            <button type="button" onClick={handleRequestClick}>{requestStatus}</button>
                        )}
                    </div>
                    <div className="parties">
                        <p>Parties</p>
                        <ul>
                            {parties.length > 0 ? parties.map((party, index) => (
                                <li key={index}>
                                    <p>{party.partyName}</p>
                                    <p>{party.partyDate}</p>
                                    <p>Location {party.partyLocation}</p>
                                    <p>Host {party.hostUserId}</p>
                                    {(userProfile.userId === loggedInUserId &&
                                        <button onClick={() => handleCancelonClick(party._id)}>Cancel</button>
                                    )}
                                </li>
                            )) : 'No parties listed'}
                        </ul>
                    </div>
                    <div className="friends-list">
                        <p>Friends</p>
                        <ul>
                            {userProfile.friends.length > 0 ? userProfile.friends.map((friend, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(friend.userId)}>
                                    {friend.username}
                                </li>
                            )) : 'No friends listed'}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>User profile not found.</p>
            )}
        </div>
    );
};

export default UserProfile;
