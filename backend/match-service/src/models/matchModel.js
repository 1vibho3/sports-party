const mongoose = require('mongoose');

const matchScehma = new mongoose.Schema({
    matchId: String,
    matchdate: String,
    matchVenueId: String,
    matchVenueName: String,
    matchVenueCity: String,
    leagueId: String,
    leagueName: String,
    season: Number,
    matchDay: String,
    homeTeamId: String,
    homeTeamName: String,
    homeTeamLogo: String,
    homeTeamGoals: Number,
    awayTeamId: String,
    awayTeamName: String,
    awayTeamLogo: String,
    awayTeamGoals: String
});

const Match = mongoose.model('Match', matchScehma);

module.exports = Match;