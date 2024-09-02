const express = require('express');
const {createUserProfileController, 
    getUserController, 
    getUserProfileController, 
    addFriendController, 
    deleteFriendController,
    getUserFriendsController,
    addPartyController,
    getUserPartiesController,
    deletePartyController} = require('../controllers/userProfileController');
const authenticateUser = require('../../../Middleware/authenticate');

const router = express.Router();

//router.use(authenticateUser);

router.post('/createUserProfile', createUserProfileController);
router.get('/getUsers', authenticateUser, getUserController);
router.get('/getUser/:userId', getUserProfileController);
router.post('/addFriend', addFriendController);
router.post('/deleteFriend', deleteFriendController);
router.get('/getUserFriends/:userId', getUserFriendsController);
router.post('/addParty', addPartyController);
router.get('/getParty/:userId', getUserPartiesController);
router.patch('/deleteParty', deletePartyController)

module.exports = router;

