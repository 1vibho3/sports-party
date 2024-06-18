const {createUserProfileService, getUserService, getUserProfileService} = require('../services/userProfileService');

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
        console.log(data);
        const userData = await getUserProfileService(data);
        console.log(userData);
        res.status(200).json({success: true, data: userData});
    }
    catch(error){
        res.status(500).json({success: false, message:'Error fetching user'})
    }
};