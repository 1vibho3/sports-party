const express = require('express');
const router = express.Router(); 
const {createPartyController} = require('../controllers/partyController');

router.post('/createParty', createPartyController);

module.exports = router;