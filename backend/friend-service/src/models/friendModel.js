const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    requestFromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    requestToUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    requestFromUserName: {type: String, required: true},
    requestToUserName: {type: String, required: true},
    requestStatus: String,
    createdAt: Date,
    accetptedAt: Date

});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;