import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from '../../axios/axios';
import './DisplayMatch.css';

const DisplayMatch = () => {
    const [matches, setMatches] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [matchDayFilter, setMatchDayFilter] = useState('');
    const [homeTeamFilter, setHomeTeamFilter] = useState('');
    const [awayTeamFilter, setAwayTeamFilter] = useState('');
    const [seasonFilter, setSeasonFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/match/getMatch');
                console.log(response.data.data);
                const result = await response.data.data;
                setMatches(result);
            } catch (error) {
                console.error('Error getting matches:', error);
            }
        };

        fetchData();
    }, []);

    const matchdays = [...new Set(matches.map(match => match.matchDay))];
    const hometeams = [...new Set(matches.map(match => match.homeTeamName))];
    const seasons = [...new Set(matches.map(match => match.season))];
    const awayteams = [...new Set(matches.map(match => match.awayTeamName))];

    // Apply filters
    const filteredMatches = matches.filter(match => (
        (matchDayFilter === '' || match.matchDay === matchDayFilter) &&
        (homeTeamFilter === '' || match.homeTeamName === homeTeamFilter) &&
        (seasonFilter === '' || match.season === seasonFilter) &&
        (awayTeamFilter === '' || match.awayTeamName == awayTeamFilter)
    ));

    const resetFilters = () => {
        setMatchDayFilter('');
        setHomeTeamFilter('');
        setAwayTeamFilter('');
        setSeasonFilter('');
    };

    return (
        <div className="match-data-container">
            <div className="filters">
                <label>
                    Match Day:
                    <select value={matchDayFilter} onChange={e => setMatchDayFilter(e.target.value)}>
                        <option value="">All</option>
                        {matchdays.map(matchday => (
                            <option key={matchday} value={matchday}>{matchday}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Home Team:
                    <select value={homeTeamFilter} onChange={e => setHomeTeamFilter(e.target.value)}>
                        <option value="">All</option>
                        {hometeams.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Away Team:
                    <select value={awayTeamFilter} onChange={e => setAwayTeamFilter(e.target.value)}>
                        <option value="">All</option>
                        {awayteams.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Season:
                    <select value={seasonFilter} onChange={e => setSeasonFilter(e.target.value)}>
                        <option value="">All</option>
                        {seasons.map(season => (
                            <option key={season} value={season}>{season}</option>
                        ))}
                    </select>
                </label>
                <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
            </div>
            <div>
                <ul className="match-list">
                    {filteredMatches.map((match, index) => (
                        <li key={match._id || index} className="match-list-wrapper">
                            {/* Render all attributes of the match */}
                            
                                <span className="match-item-date">{match.matchdate}</span>
                                <span className="match-item">{match.homeTeamName}
                                    <img src={match.homeTeamLogo} alt={`${match.homeTeamName} logo`} className="team-logo" /> 
                                </span>     
                                <span className="match-item">{match.homeTeamGoals}</span>
                                <span className="match-item">{match.awayTeamGoals}
                                    <img src={match.awayTeamLogo} alt={`${match.awayTeamName} logo`} className="team-logo" />
                                </span>
                                <span className="match-item">{match.awayTeamName}</span>
                                <span className="match-item-venue">{match.matchVenueName}</span>
                                <span>
                                    <Link to = "/createParty">
                                        <button>Invite to Party</button>
                                    </Link>
                                </span>
                        </li>
                    ))}
                </ul>
            </div>         
        </div>
    );
};

export default DisplayMatch;
