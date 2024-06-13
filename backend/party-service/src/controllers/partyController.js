const {createPartyService} = require('../services/partyService');

exports.createPartyController = async (req, res) =>{
    try {
        const partyData = req.body;
        const party = await createPartyService(partyData);
        res.status(200).json({ success: true, data: party });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error fetching party data' });
    }
};