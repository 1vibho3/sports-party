const Friend = require('../models/friendModel');

exports.sendFriendRequestService = async (requestData) =>{
    try{
        
        const {requestFromUserId,requestToUserId} = requestData;
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
        const{requestFromUserId, requestToUserId} = requestData;
       // console.log(requestData);
        const friendRequest = await Friend.findOneAndUpdate(
            {requestFromUserId: requestFromUserId, requestToUserId: requestToUserId, requestStatus: 'pending'},
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

exports.deleteFriendRequestService = async(deleteData) => {
    try{
        const{requestFromUserId, requestToUserId} = deleteData;
        console.log(deleteData);
        const deleteRequest = await Friend.deleteOne(
            {requestFromUserId: requestFromUserId, requestToUserId: requestToUserId,  requestStatus: 'accepted'}
        );
        console.log(deleteRequest);
       // return deleteRequest;
    }
    catch(error){
        console.log('Error deleting friend request');
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