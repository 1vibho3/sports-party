const UserProfile = require('../models/userProfile');
const axios = require('axios');

//Creates a userprofile upon logging in
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

//gets the users matching the query upon searching in the app
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

//gets the user profile by id
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

//add friends to a user's document
exports.addFriendService = async (data) => {
    try{
        const { requestFromUserId, requestToUserId } = data;

        const user1 = await UserProfile.findOne({ userId: requestFromUserId });
        const user2 = await UserProfile.findOne({ userId: requestToUserId });

        if (!user1 || !user2) {
            throw new Error('User profile not found');
        }

        user1.friends.push({ userId: user2.userId, username: user2.username });
        await user1.save();

        user2.friends.push({ userId: user1.userId, username: user1.username });
        await user2.save();

        console.log('Friend added successfully');
    }
    catch(error){
        console.log('Error addid friend');
        throw error;
    }
};


//delete added freinds
exports.deleteFriendService = async (data) => {
    try{
        const { requestFromUserId, requestToUserId } = data;

        const user1 = await UserProfile.findOne({ userId: requestFromUserId });
        const user2 = await UserProfile.findOne({ userId: requestToUserId });

        if (!user1 || !user2) {
            throw new Error('User profile not found');
        }

        user1.friends.pull({ userId: user2.userId, username: user2.username });
        await user1.save();

        user2.friends.pull({ userId: user1.userId, username: user1.username });
        await user2.save();

        console.log('Friend removed successfully');
    }
    catch(error){
        console.log('Error removing friend');
        throw error;
    }
};

//gets user's friends 
exports.getUserFriendsService = async (userId) => {
    try {
        const userProfile = await UserProfile.findOne({ userId: userId }).populate({path: 'friends',
            model: 'UserProfile'}).exec();
        
        if (!userProfile) {
            console.log('User profile not found');
            return null;
        }
        
        return userProfile.friends;
    } catch (error) {
        console.log('Error getting friends list:', error.message, error.stack);
        throw error;
    }
}

//add partyId to a user's document
exports.addPartyService = async (data) => {
    try{
        const { _id, hostUserId, friends } = data;

        const hostUser = await UserProfile.findOne({userId: hostUserId});
        console.log(hostUser);
        if(!hostUser){
            throw new Error('Host user profile not found');
        }

        hostUser.parties.push(_id);
        await hostUser.save();

        for(friendId of friends){
            const friendUser = await UserProfile.findOne({userId: friendId});
            if(!hostUser){
                throw new Error('User profile not found');
                continue;
            }
            friendUser.parties.push(_id);
            await friendUser.save();
        }
    }
    catch(error){
        console.log('Error adding partyyy');
        throw error;
    }
}

exports.getUserPartiesService = async (userId) => {
    try{
        const userProfile = await UserProfile.findOne({userId})
        if (!userProfile) {
            throw new Error('User profile not found');
        }

        const partyIds = userProfile.parties.map(party=>party._id);
        
        const partyPromises = partyIds.map(partyId => axios.get(`http://localhost:5000/party/getParty/${partyId}`));
        const partyRepsones = await Promise.all(partyPromises);
        const parties = partyRepsones.map(response => response.data);
        console.log(parties);
        return parties;
    } catch (error) {
        console.error('Error fetching user parties:', error);
        throw error;
    }
}


