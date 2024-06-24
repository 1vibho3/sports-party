const mongoose = require('mongoose');

const userProfileSchema =  new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true, unique: true},
    username: {type: String, required:true},
    bio: {type: String},
    favoriteTeam: {type: String},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend'}]

    
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;