
const express = require('express');
const { sendFriendRequestController, 
        acceptFriendRequestController, 
        getFriendListController, 
        deleteFriendRequestController,
        deleteFriendRequestByRequestIdController,
        deleteFriendController, 
        getFriendRequestController, 
        getFriendRequestStatusController} = require('../controllers/friendController');
const authenticateUser = require('../../../Middleware/authenticate');
const router = express.Router();

router.post('/sendRequest', sendFriendRequestController);
router.post('/acceptRequest', acceptFriendRequestController);
router.get('/getFriends', getFriendListController);
router.get('/getFriendRequestStatus/:requestFromUserId/:requestToUserId', getFriendRequestStatusController)
router.delete('/deleteRequest', deleteFriendRequestController);
router.delete('/deleteRequestByRequestId', deleteFriendRequestByRequestIdController);
router.get('/getRequest/:requestToUserId', getFriendRequestController);
router.delete('/deleteFriend', deleteFriendController);

module.exports = router;
