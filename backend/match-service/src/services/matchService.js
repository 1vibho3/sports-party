const mongoose = require('mongoose');
const ConnectDB = require('../config/db');
const axios = require('axios');
const Match = require('../models/matchModel');
require('dotenv').config();

exports.fetchMatchData = async () =>{
    try{
        const data = await axios.get(`https://${process.env.RAPIDAPI_HOST}/v3/fixtures`, {
            params: {
                league: '39',
                season: '2023'
              },
              headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
              }
        });

        if (!data.data || !data.data.response) {
            throw new Error('Invalid response data from the API');
        }
        
    //console.log(data.data.response[0].league.id);
        const matches = data.data.response;
        await Match.deleteMany({});

        for(const match of matches){
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
            })
            console.log(`Match ${match.fixture.id} saved successfully.`);
        };

    }
    catch(error){
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