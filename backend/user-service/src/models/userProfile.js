const mongoose = require('mongoose');
const ConnectDB = require('../../../party-service/src/config/db')

const userProfileSchema =  new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true, unique: true},
    username: {type: String, required:true},
    bio: {type: String},
    favoriteTeam: {type: String},
    friends: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
        username: {type: String, required: true}
    }],
    parties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Party' }] 
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;