const {createUserProfileService, 
    getUserService, 
    getUserProfileService, 
    addFriendService, 
    deleteFriendService,
    getUserFriendsService,
    addPartyService,
    getUserPartiesService} = require('../services/userProfileService');

exports.createUserProfileController = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        const requestData = await createUserProfileService(data);
        res.status(200).json({success: tryue, data: requestData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error creating user profile'})
    }
};

exports.getUserController = async (req, res) => {
    try{
        const data = req.query;
        console.log(data);
        const usersData = await getUserService(data);
        res.status(200).json({success: true, data: usersData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error fetching all users'})
    }
};

exports.getUserProfileController = async (req, res) => {
    try{
        const data = req.params.userId;
        const userData = await getUserProfileService(data);
        res.status(200).json({success: true, data: userData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error fetching user'})
    }
};

exports.addFriendController = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        const addFriendData = await addFriendService(data);
        res.status(200).json({success: true, data: addFriendData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error adding freind'});
    }
}

exports.addPartyController = async (req, res) => {
    try{
        const data = req.body;
        console.log(data);
        const addPartyData = await addPartyService(data);
        res.status(200).json({success: true, data: addPartyData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error adding partyy'});
    }
}

exports.deleteFriendController = async (req, res) => {
    try{
        const data = req.body.data;
        console.log(data);
        const addFriendData = await deleteFriendService(data);
        res.status(200).json({success: true, data: addFriendData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error deleting freind'});
    }
}

exports.getUserFriendsController = async (req, res) => {
    try{
        const userId = req.params.userId;
        const response = await getUserFriendsService(userId);
        res.status(200).json({success: true, data: response});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error getting friend'});
    }
}

exports.getUserPartiesController = async (req, res) => {
    try{
        const userId = req.params.userId;
        const parties = await getUserPartiesService(userId);
        res.status(200).json({ success: true, data: parties });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching user parties' });
    }
}