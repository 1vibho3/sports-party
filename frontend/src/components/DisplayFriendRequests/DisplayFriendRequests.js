import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';
import './DisplayFriendRequests.css'

const FriendRequest = () => {
    const loggedInUserId = sessionStorage.getItem('userID');
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.get(`/friends/getRequest/${loggedInUserId}`);
                setFriendRequests(response.data.data);
            } catch (err) {
                console.error('Error fetching friend requests:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFriendRequests();
    }, [loggedInUserId]);

    const handleAccept = async (_id) => {
        try {
            console.log(_id);
            const response = await axios.post(`/friends/acceptRequest/`,  {_id });
            //console.log(response);
            setFriendRequests(friendRequests.filter(request => request._id !== _id));
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };

    const handleReject = async (_id) => {
        try {
            await axios.delete(`/friends/deleteRequestByRequestId/`, { data: { _id } });
            setFriendRequests(friendRequests.filter(request => request._id !== _id));
        } catch (err) {
            console.error('Error rejecting friend request:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="notification-container">
            <button className="dropdown-button">
                Requests {friendRequests.length > 0 && `(${friendRequests.length})`}
            </button>
            <ul className="dropdown-menu">
                {friendRequests.length === 0 ? (
                    <li className="dropdown-item">No friend requests</li>
            ) : (
                    friendRequests.map((request) => (
                        <li key={request._id} className="dropdown-item">
                            <span>{request.requestFromUserName}</span>
                            <button className="request-button"onClick={() => handleAccept(request._id)}>Accept</button>
                            <button className="request-button"onClick={() => handleReject(request._id)}>Reject</button>
                        </li>
                    ))
            )}
            </ul>
        </div>
    );
};

export default FriendRequest;
