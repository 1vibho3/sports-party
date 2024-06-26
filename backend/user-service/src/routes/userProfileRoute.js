const express = require('express');
const {createUserProfileController, 
    getUserController, 
    getUserProfileController, 
    addFriendController, 
    deleteFriendController,
    getUserFriendsController,
    addPartyController,
    getUserPartiesController} = require('../controllers/userProfileController');
const authenticateUser = require('../../../Middleware/authenticate');

const router = express.Router();

//router.use(authenticateUser);

router.post('/createUserProfile', createUserProfileController);
router.get('/getUsers', authenticateUser, getUserController);
router.get('/getUser/:userId',authenticateUser, getUserProfileController);
router.post('/addFriend', addFriendController);
router.post('/deleteFriend', deleteFriendController);
router.get('/getUserFriends/:userId', getUserFriendsController);
router.post('/addParty', addPartyController);
router.get('/getParty/:userId', getUserPartiesController)

module.exports = router;

