const Friend = require('../models/friendModel');
const UserProfile = require('../../../user-service/src/models/userProfile');
const axios = require('axios');

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
        
        if(existingRequest){
            console.log("Friend request already exist");
            return{message: 'Friend requewst already sent'};
        }

        const friendRequest = new Friend({requestFromUserId: requestFromUserId, 
                                            requestToUserId: requestToUserId, 
                                            requestStatus: 'pending', createdAt: Date.now()})
      console.log(friendRequest);
       const friend = await friendRequest.save();
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
       // console.log(requestData);
        const friendRequest = await Friend.findOneAndUpdate(
            {_id: _id, requestStatus: 'pending'},
            {requestStatus: 'accepted', acceptedAt: Date.now()},
            {new: true}
        );
        

        const { requestFromUserId, requestToUserId } = friendRequest;

        try {
            await axios.post('http://localhost:5000/userProfile/addFriend', friendRequest);
        } catch (error) {
            console.error('Error adding friend:', error);
        }

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
        const{requestFromUserId, requestToUserId} = deleteData;
        const deleteRequest = await Friend.deleteOne(
            {requestFromUserId: requestFromUserId, requestToUserId: requestToUserId,  requestStatus: 'pending'}
        );
        console.log(deleteRequest);
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
        const deleteFriend = await Friend.deleteOne({
            $or: [
                { requestFromUserId, requestToUserId, requestStatus: 'accepted' },
                { requestFromUserId: requestToUserId, requestToUserId: requestFromUserId, requestStatus: 'accepted' }
            ]
        });
        
        try {
            await axios.post('http://localhost:5000/userProfile/deleteFriend', deleteData);
        } catch (error) {
            console.error('Error deleting friend', error);
        }
    }
    catch(error){
        console.log("Error deleting friend");
        throw error;
    }
}