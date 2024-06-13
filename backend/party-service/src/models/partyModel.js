const mongoose = require('mongoose');

const partyScehma = new mongoose.Schema({

    partyId: String,
    partyName: String,
    partyDate: Date,
    partyLocation: String,
    hostUserId: String
});

const Party = mongoose.model('Party', partyScehma);

module.exports = Party;