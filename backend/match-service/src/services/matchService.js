const mongoose = require('mongoose');
const ConnectDB = require('../config/db');
const axios = require('axios');
const Match = require('../models/matchModel');
require('dotenv').config();

exports.fetchMatchData = async () => {
    const leagueIds = ['39', '140', '61', '71', '78' ]; // Add your league IDs here

    try {
        await Match.deleteMany({});

        const promises = leagueIds.map(leagueId => axios.get(`https://${process.env.RAPIDAPI_HOST}/v3/fixtures`, {
            params: {
                league: leagueId,
                next: '99'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
            }
        }));

        const results = await Promise.all(promises);

        for (const result of results) {
            if (!result.data || !result.data.response) {
                throw new Error('Invalid response data from the API');
            }

            const matches = result.data.response;

            for (const match of matches) {
                console.log(`Saving match ${match.fixture.id}`);
                await Match.create({
                    matchId: match.fixture.id,
                    matchdate: match.fixture.date,
                    matchVenueId: match.fixture.venue.id,
                    matchVenueName: match.fixture.venue.name,
                    matchVenueCity: match.fixture.venue.city,
                    leagueId: match.league.id,
                    leagueName: match.league.name,
                    season: match.league.season,
                    matchDay: match.league.round,
                    homeTeamId: match.teams.home.id,
                    homeTeamName: match.teams.home.name,
                    homeTeamLogo: match.teams.home.logo,
                    homeTeamGoals: match.goals.home,
                    awayTeamId: match.teams.away.id,
                    awayTeamName: match.teams.away.name,
                    awayTeamLogo: match.teams.away.logo,
                    awayTeamGoals: match.goals.away
                });
                console.log(`Match ${match.fixture.id} saved successfully.`);
            }
        }

    } catch (error) {
        console.log('Error fetching and saving match data: ', error);
    }
};


exports.getMatchData = async () =>{
    try {
        const matches = await Match.find({});
        return matches;
    }
    catch(error){
        console.log('Error ' + error);
        throw errorResponsePlugin;
    }
}