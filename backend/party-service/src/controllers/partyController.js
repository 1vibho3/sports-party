const {createPartyService, getPartyService, deletePartyService} = require('../services/partyService');

exports.createPartyController = async (req, res) =>{
    try {
        const partyData = req.body;
        console.log(partyData);
        const party = await createPartyService(partyData);
        res.status(200).json({ success: true, data: party });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error creating party data' });
    }
};

exports.getPartyController = async (req, res) =>{
    try {
        const partyId = req.params.partyId;
        console.log(partyId);
        const party = await getPartyService(partyId);
        res.status(200).json({ success: true, data: party });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error fetching party data' });
    }
};

exports.deletePartyController = async (req, res) =>{
    try {
        const partyId = req.params.partyId;
        const party = await deletePartyService(partyId);
        res.status(200).json({ success: true, data: party });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error deleting party' });
    }
};