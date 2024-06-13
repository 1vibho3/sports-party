const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    requestFromUserId: String,
    requestToUserId: String,
    requestStatus: String,
    createdAt: Date,
    accetptedAt: Date

});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;