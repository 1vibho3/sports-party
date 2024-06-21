const Friend = require('../models/friendModel');

exports.sendFriendRequestService = async (requestData) =>{
    try{
        
        const {requestFromUserId,requestToUserId} = requestData;
        const existingRequest = await Friend.findOne({
            requestFromUserId: requestFromUserId,
            requestToUserId: requestToUserId
        });
        
        if(existingRequest){
            console.log("Friend request already exist");
            return{message: 'Friend requewst already sent'};
        }
        const friendRequest = new Friend({requestFromUserId: requestFromUserId, 
                                            requestToUserId: requestToUserId, 
                                            requestStatus: 'pending', createdAt: Date.now()})
        console.log(friendRequest);
        return friendRequest.save();
    }
    catch(error){
        console.log('Error sending friend request');
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
       // console.log(friendRequest);
        return friendRequest;
    }
    catch(error){
        console.log('Error accepting friend request');
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
        const requestStatus = await Friend.findOne(
                {requestFromUserId: requestFromUserId, requestToUserId: requestToUserId}, 'requestStatus'
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

exports.deleteFriendService = async (deleteData) => {
    try{
        const{requestFromUserId, requestToUserId} = deleteData;
        const deleteFriend = await Friend.deleteOne({
            requestFromUserId: requestFromUserId, requestToUserId: requestToUserId, requestStatus: 'accepted'
        });
        console.log(deleteFriend);
    }
    catch(error){
        console.log("Error deleting friend");
        throw error;
    }
}