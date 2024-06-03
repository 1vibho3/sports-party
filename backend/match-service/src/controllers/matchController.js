const { fetchMatchData } = require("../services/matchService")

const fetchMatchDataController = async (req, res) => {
    try{
        const matchData = await fetchMatchData();
        res.status(200).json({ success: true, data: matchData });
    }catch(error){
        res.status(500).json({ success: false, error: 'Error fetching match data' });
    }
};

module.exports = {fetchMatchDataController};