const {sendFriendRequestService, acceptFriendRequestService, getFriendListService, deleteFriendRequestService, deleteFriendService} = require('../services/friendService');

exports.sendFriendRequestController = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        const requestData = await sendFriendRequestService(data);
        res.status(200).json({success: true, data: requestData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error fetching friend request data'})
    }
};

exports.acceptFriendRequestController = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        const requestData = await acceptFriendRequestService(data);
        console.log(requestData);
        res.status(200).json({success: true, data: requestData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error fetching friend request data'})
    }
};

exports.getFriendListController = async (req, res) => {
    try{
        const requestFromUserId = req.body;
        //console.log(requestFromUserId);
        const requestData = await getFriendListService(requestFromUserId);
        //console.log(requestData);
        res.status(200).json({success: true, data: requestData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error fetching friend list data'})
    }
};

exports.deleteFriendRequestController = async (req, res) => {
    try{
        const data = req.body;
        const deleteData = await deleteFriendRequestService(data);
        res.status(200).json({success: true, data:deleteData});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:'Error deleting freind request'});
    }
};

exports.deleteFriendController = async (req, res) =>{
    try{
        const data = req.body;
        const deleteFriend = await deleteFriendService(data);
        res.status(200).json({success: true, data: deleteFriend});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Error deleting friend"})
    }
};