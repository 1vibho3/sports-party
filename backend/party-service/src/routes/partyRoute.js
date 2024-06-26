const express = require('express');
const router = express.Router(); 
const {createPartyController, getPartyController} = require('../controllers/partyController');

router.post('/createParty', createPartyController);
router.get('/getParty/:partyId', getPartyController)

module.exports = router;