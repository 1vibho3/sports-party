import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';

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
            const response = await axios.post(`/friends/acceptRequest/`, { _id });
            console.log(response);
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
        <div>
            <Navbar />
            <h2>Friend Requests</h2>
            {friendRequests.length === 0 ? (
                <p>No friend requests.</p>
            ) : (
                <ul>
                    {friendRequests.map((request) => (
                        <li key={request._id}>
                            <span>{request.requestFromUserId}</span>
                            <button onClick={() => handleAccept(request._id)}>Accept</button>
                            <button onClick={() => handleReject(request._id)}>Reject</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendRequest;
