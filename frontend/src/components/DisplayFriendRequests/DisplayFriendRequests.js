import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios/axios';
import Navbar from '../Navbar/Navbar';

const FriendRequest =  () =>{

    const loggedInUserId = sessionStorage.getItem('userID');
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(()=>{
        const fetchFriendRequst = async () =>{
            try{
                const response = await axios.get(`/friends/getRequest/${loggedInUserId}`);
                console.log(response);
                setFriendRequests(response.data.data);
            }
            catch (err) {
                console.log('Error fetching freinds requests:', err);
            }
        };
        fetchFriendRequst();
    }, [loggedInUserId]);

    const handleAccept = async(_id) =>{
        try {
            const response = await axios.post(`/friends/acceptRequest`, {_id});
            setFriendRequests(friendRequests.filter(request => request._id != _id))
        }catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Friend Requests</h2>
            {friendRequests.length === 0 ? (
                <p>No friend requests.</p>
            ) : (
                <ul>
                    {friendRequests.map((request, index) => (
                        <li key={index}>
                            <span>{request.requestFromUserId}</span>
                            <button onClick={() => handleAccept(request._id)}>Accept</button>
                            {/* <button onClick={() => handleReject(request._id)}>Reject</button> */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FriendRequest;