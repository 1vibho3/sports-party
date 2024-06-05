const express = require('express');
const {fetchMatchDataController, getMatchController} = require('../controllers/matchController');

const router = express.Router();

router.get('/fetchMatch', fetchMatchDataController);
router.get('/getMatch', getMatchController);

module.exports = router;