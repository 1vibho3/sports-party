const express = require('express');
const {createUserProfileController, getUserController, getUserProfileController} = require('../controllers/userProfileController');
const authenticateUser = require('../../../Middleware/authenticate');

const router = express.Router();

//router.use(authenticateUser);

router.post('/createUserProfile', createUserProfileController);
router.get('/getUsers', authenticateUser, getUserController);
router.get('/getUser/:userId',authenticateUser, getUserProfileController);

module.exports = router;

