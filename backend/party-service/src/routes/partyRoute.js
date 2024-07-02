const express = require('express');
const router = express.Router(); 
const {createPartyController, getPartyController, deletePartyController} = require('../controllers/partyController');

router.post('/createParty', createPartyController);
router.get('/getParty/:partyId', getPartyController);
router.delete('/deleteParty/:partyId', deletePartyController);

module.exports = router;