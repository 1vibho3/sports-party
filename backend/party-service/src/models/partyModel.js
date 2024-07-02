const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({

   // partyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    partyName: {type: String, required: true},
    partyDate: Date,
    partyLocation: String,
    hostUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    note: {type:String},
    friends: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'}
    }]
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;