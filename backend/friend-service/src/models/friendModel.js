const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    requestFromUserId: { type: mongoose.Schema.Types.ObjectId, duplicate: true, required: true },
    requestToUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    requestStatus: String,
    createdAt: Date,
    accetptedAt: Date

});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;