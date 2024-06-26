const Party = require('../models/partyModel');
const axios = require('axios');

exports.createPartyService = async (partyData) =>{
    try{
        const {partyName, partyDate, partyLocation, userId: hostUserId, selectedUsers: friends} = partyData;

        const formattedFriends = friends.map(friendId => ({ userId: friendId }));

        const party = await Party.create({
            partyName,
            partyDate,
            partyLocation,
            hostUserId,
            friends: formattedFriends
        });

        const payload = { _id: party._id,
            partyName: party.partyName,
            partyDate: party.partyDate,
            partyLocation: party.partyLocation,
            hostUserId: party.hostUserId,
            friends: party.friends.map(friend => friend.userId)
        }

        try {
            await axios.post('http://localhost:5000/userProfile/addParty', payload);
        } catch (error) {
            console.error('Error adding party:', error);
        }

        
        return party;
    } catch (error){
        console.log('Error creating party: ', error);
        throw error;
    }
};

exports.getPartyService = async (partyId) => {
    try{
        const response = await Party.findOne({_id: partyId});
        return response;
    }
    catch(error){
        console.log('Error getting party', error);
        throw error;
    }
}

