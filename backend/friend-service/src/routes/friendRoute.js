
const express = require('express');
const { sendFriendRequestController, acceptFriendRequestController, getFriendListController, deleteFriendRequestController, deleteFriendController } = require('../controllers/friendController');
const authenticateUser = require('../../../Middleware/authenticate');
const router = express.Router();

router.post('/sendRequest', authenticateUser, sendFriendRequestController);
router.post('/acceptRequest', acceptFriendRequestController);
router.get('/getFriends', getFriendListController);
router.delete('/deleteRequest', deleteFriendRequestController);
router.delete('/deleteFriend', deleteFriendController);

module.exports = router;
