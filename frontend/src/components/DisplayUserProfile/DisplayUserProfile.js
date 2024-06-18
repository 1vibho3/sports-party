import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios';

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
                const response = await axios.get(`/userProfile/getUser/${userId}`);
                setUserProfile(response.data.data);
            } catch (err) {
                setError('Error fetching user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleRequestClick = async () => {
        try{
            if(requestStatus === "Send Request"){
                const payload = {requestFromUserId: loggedInUserId, requestToUserId: userId};
                console.log(payload);
                const response = await axios.post(`/friends/sendRequest/`, payload);
                setRequestStatus("Pending");
            }
            else if(requestStatus === "Pending"){
                const payload = {requestFromUserId: loggedInUserId, requestToUserId: userId};
                console.log(payload);
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
            {userProfile ? (
                <div>
                    <h1>{userProfile.username}</h1>
                    <p>User ID: {userProfile.userId}</p>
                    <p>Friends: {userProfile.friends.join(', ') || 'No friends listed'}</p>
                    <button type="button" onClick ={handleRequestClick}>{requestStatus}</button>
                </div>
            ) : (
                <p>User profile not found.</p>
            )}
        </div>
    );
};

export default UserProfile;
