const Party = require('../models/partyModel');

exports.createPartyService = async (partyData) =>{
    try{
        const {partyName, partyDate, partyLocation, userId: hostUserId} = partyData;

        const party = await Party.create({
            partyName,
            partyDate,
            partyLocation,
            hostUserId
        });

        return party;
    } catch (error){
        console.log('Error creating party: ', error);
        throw error;
    }
};

