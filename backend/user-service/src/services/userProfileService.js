const UserProfile = require('../models/userProfile');

exports.createUserProfileService = async (userProfileData) => {
    try{
        const {userId, username} = userProfileData;
        const userProfile = new UserProfile({userId: userId, username: username});
        return userProfile.save();
    }
    catch(error){
        console.log('Error creating user profile');
        throw error;
    }
};

exports.getUserService = async (query) => {
    try{
        const { query: queryString } = query;
        const users = await UserProfile.find({username: {$regex: queryString, $options: 'i' }});            
        return users;
    }
    catch(error){
        console.log('Error getting users');
        throw error;
    }
}

exports.getUserProfileService = async (userId) => {
    try{
        const user = await UserProfile.findOne({userId: userId});
        return user;
    }
    catch(error){
        console.log('Error getting user');
        throw error;
    }
};

