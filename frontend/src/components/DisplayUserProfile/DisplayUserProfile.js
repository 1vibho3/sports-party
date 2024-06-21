import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';

const UserProfile = () => {
    const { userId } = useParams();
    const loggedInUserId = sessionStorage.getItem('userID');
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requestStatus,setRequestStatus] = useState("Send Request");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = sessionStorage.getItem('token'); 
                if (!token) {
                    throw new Error('No token found in sessionStorage');
                }
                const response = await axios.get(`/userProfile/getUser/${userId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`  // Include token in the request header
                    }
            });
                setUserProfile(response.data.data);
                await fetchRequestStatus();
            } catch (err) {
                setError('Error fetching user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const fetchRequestStatus = async () => {
        try {
            const response = await axios.get(`/friends/getFriendRequestStatus/${loggedInUserId}/${userId}`);
           
            const status = response.data.data; // Adjust according to your API response structure
            console.log(status);
            if(status === "pending")
                setRequestStatus("pending");
            else    
                setRequestStatus("Send Request");
        } catch (err) {
            console.log('Error fetching request status:', err);
        }
    };

    const handleRequestClick = async () => {
        try{
            if(requestStatus === "Send Request"){
                const payload = {requestFromUserId: loggedInUserId, requestToUserId: userId};
                const response = await axios.post(`/friends/sendRequest/`, payload);
                setRequestStatus("pending");
            }
            else if(requestStatus === "pending"){
                const payload = {requestFromUserId: loggedInUserId, requestToUserId: userId};
                const response = await axios.delete(`/friends/deleteRequest/`, {data:payload});
                setRequestStatus("Send Request");
            }
        }
        catch(err){
            console.log('Error Sending request');
        }
       
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Navbar/>
            {userProfile ? (
                <div>
                    <h1>{userProfile.username}</h1>
                    <p>User ID: {userProfile.userId}</p>
                    <p>Friends: {userProfile.friends.join(', ') || 'No friends listed'}</p>
                    {(userProfile.userId != loggedInUserId && 
                        <button type="button" onClick ={handleRequestClick}>{requestStatus}</button>
                    )}
                </div>
            ) : (
                <p>User profile not found.</p>
            )}
        </div>
    );
};

export default UserProfile;
