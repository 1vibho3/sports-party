const cron = require('node-cron');
const {fetchMatchData} = require('../services/matchService');

const initBackgroundTasks = () =>{
    cron.schedule('0 2 * * 1', async () =>{
        console.log('running fetchMatchData...');
        await fetchMatchData();
    });
};

module.exports = {initBackgroundTasks};