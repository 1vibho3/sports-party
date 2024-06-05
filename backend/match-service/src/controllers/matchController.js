const { fetchMatchData, getMatchData } = require("../services/matchService")

exports.fetchMatchDataController = async (req, res) => {
    try{
        const matchData = await fetchMatchData();
        res.status(200).json({ success: true, data: matchData });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error fetching match data' });
    }
};

exports.getMatchController = async (req, res) => {
    try{
        const matches = await getMatchData();
        res.status(200).json({ success: true, data: matches });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error getting match data' });
    }
};