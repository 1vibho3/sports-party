const express = require('express');
const {fetchMatchDataController} = require('../controllers/matchController');

const router = express.Router();

router.get('/getMatch', fetchMatchDataController);

module.exports = router;