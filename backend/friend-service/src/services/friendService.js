const Friend = require('../models/friendModel');
const UserProfile = require('../../../user-service/src/models/userProfile');
const axios = require('axios');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:5006');

const mongoose = require('mongoose');

exports.sendFriendRequestService = async (requestData) =>{
    try{
      
        const {requestFromUserId,requestToUserId} = requestData;
        const existingRequest = await Friend.findOne({
            $or: [
                { requestFromUserId: requestFromUserId, requestToUserId: requestToUserId },
                { requestFromUserId: requestToUserId, requestToUserId: requestFromUserId }
            ]
        });
        
      console.log(existingRequest);
        if(existingRequest){
            console.log("Friend request already exist");
            return{message: 'Friend requewst already sent'};
        }
        const userFrom = await axios.get(`http://localhost:5000/userProfile/getUser/${requestFromUserId}`);
        const userTo = await axios.get(`http://localhost:5000/userProfile/getUser/${requestToUserId}`);
        

        const friendRequest = new Friend({requestFromUserId: requestFromUserId, 
                                            requestToUserId: requestToUserId, 
                                            requestFromUserName: userFrom.data.data.username,
                                            requestToUserName: userTo.data.data.username,
                                            requestStatus: 'pending', createdAt: Date.now()});
  
        const friend = await friendRequest.save();

        socket.emit('friendRequestSent', {
            userId: requestToUserId,
            message: `You have a new friend request from ${userFrom.data.data.username}`
        });

        return friendRequest;
    }
    catch(error){
        console.log('Error sending friend request', error);
        throw error;
    }
}

exports.acceptFriendRequestService = async(requestData) => {
    try{
        const{_id} = requestData;
        //console.log(requestData);
        const friendRequest = await Friend.findOneAndUpdate(
            {_id: _id, requestStatus: 'pending'},
            {requestStatus: 'accepted', acceptedAt: Date.now()},
            {new: true}
        );
        
       //console.log(friendRequest); 

        const { requestFromUserId, requestToUserId } = friendRequest;
         console.log(friendRequest); 

        try {
            await axios.post('http://localhost:5000/userProfile/addFriend', friendRequest);
        } catch (error) {
            console.error('Error adding friend:', error);
        }

        const user = await axios.get(`http://localhost:5000/userProfile/getUser/${requestToUserId}`);
        socket.emit('friendRequestAccepted', {
            userId: requestFromUserId,
            message: `${user.data.data.username} has accepted your friend request`
        });

        return friendRequest;
    }
    catch(error){
        console.log('Error accepting friend request', error);
        throw error;
    }
};

exports.getFriendRequestService = async(userId) => {
    try{
        const {requestToUserId} = userId;
        const friendRequests = await Friend.find({  requestToUserId: requestToUserId,
            requestStatus: 'pending' })
        return friendRequests;
    }catch(error){
        console.log('Error getting friend requests');
        throw error;
    }
}

exports.getFriendRequestStatusService = async(requestData) => {
    try{
        const{requestFromUserId, requestToUserId} = requestData;
        const requestStatus = await Friend.findOne({
            $or: [
                { requestFromUserId, requestToUserId },
                { requestFromUserId: requestToUserId, requestToUserId: requestFromUserId }
            ]}, 'requestStatus'
    );
        if (!requestStatus) {
            console.log('No request found');
            return { requestStatus: 'No Request Found' };
       }
        return requestStatus;
    }
    catch(error){
        console.log('Error fetching friend request status');
        throw error;
    }
};

exports.getFriendListService = async(userId) => {
    try{
        const{requestFromUserId} = userId;
        const friends = await Friend.find({
            $or: [
                {requestToUserId: requestFromUserId, requestStatus: 'accepted'},
                {requestFromUserId: requestFromUserId, requestStatus: 'accepted'}
            ]
        }).populate('requestToUserId requestFromUserId');
        console.log(friends);
        return friends;
    }
    catch(error){
        console.log('Error fetching friend list');
        throw error;
    }
};

exports.deleteFriendRequestService = async(deleteData) => {
    try{
        console.log(deleteData);
        const{requestFromUserId, requestToUserId} = deleteData;
        const deleteRequest = await Friend.deleteOne(
            {requestFromUserId: requestFromUserId, requestToUserId: requestToUserId,  requestStatus: 'pending'}
        );
        //console.log(deleteRequest);
       // return deleteRequest;
    }
    catch(error){
        console.log('Error deleting friend request');
        throw error;
    }
};

exports.deleteFriendRequestByRequestIdService = async(deleteData) => {
    try{
        const{_id} = deleteData;
        const deleteRequest = await Friend.deleteOne(
            {_id:_id}
        );
    }
    catch(error){
        console.log('Error deleting friend request');
        throw error;
    }
};

exports.deleteFriendService = async (deleteData) => {
    try{
        const{requestFromUserId, requestToUserId} = deleteData;
        const person = await Friend.findOne({userId: new mongoose.Types.ObjectId(requestFromUserId)});
      
        const deleteFriend = await Friend.deleteOne({
            $or: [
                { requestFromUserId, requestToUserId, requestStatus: 'accepted' },
                { requestFromUserId: requestToUserId, requestToUserId: requestFromUserId, requestStatus: 'accepted' }
            ]
        });
        
        console.log(deleteData);
        try {
            await axios.post('http://localhost:5000/userProfile/deleteFriend', deleteData);
        } catch (error) {
            console.error('Error deleting friend');
        }
    }
    catch(error){
        console.log("Error deleting friend");
        throw error;
    }
}