import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios';
import './DisplayMatch.css';
import Navbar from '../Navbar/Navbar';

const DisplayMatch = () => {
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [matchDayFilter, setMatchDayFilter] = useState('');
    const [homeTeamFilter, setHomeTeamFilter] = useState('');
    const [awayTeamFilter, setAwayTeamFilter] = useState('');
    const [leagueFilter, setLeagueFilter] = useState('');
    const [leagueOptions, setLeagueOptions] = useState([]);
    const [hometeamOptions, setHomeTeamOptions] = useState([]);
    const [awayteamOptions, setAwayTeamOptions] = useState([]);
    const [matchdayOptions, setMatchDayOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/match/getMatch');
                const fetchedMatches = response.data.data;
                setMatches(fetchedMatches);
                setFilteredMatches(fetchedMatches);
                updateFilters(fetchedMatches); // Update filter options based on fetched data
            } catch (error) {
                console.error('Error getting matches:', error);
            }
        };

        const updateFilters = (matchesData) => {
            const leagues = [...new Set(matchesData.map(match => match.leagueName))];
            setLeagueOptions(leagues);

            const hometeams = [...new Set(matchesData.map(match => match.homeTeamName))];
            setHomeTeamOptions(hometeams);

            const awayteams = [...new Set(matchesData.map(match => match.awayTeamName))];
            setAwayTeamOptions(awayteams);

            const matchdays = [...new Set(matchesData.map(match => match.matchDay))];
            setMatchDayOptions(matchdays);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = matches.filter(match => (
            (leagueFilter === '' || match.leagueName === leagueFilter) &&
            (homeTeamFilter === '' || match.homeTeamName === homeTeamFilter) &&
            (awayTeamFilter === '' || match.awayTeamName === awayTeamFilter) &&
            (matchDayFilter === '' || match.matchDay === matchDayFilter)
        ));
        setFilteredMatches(filtered);
    }, [leagueFilter, homeTeamFilter, awayTeamFilter, matchDayFilter, matches]);

    const resetFilters = () => {
        setMatchDayFilter('');
        setHomeTeamFilter('');
        setAwayTeamFilter('');
        setLeagueFilter('');
    };

    const handleLeagueChange = (selectedLeague) => {
        setLeagueFilter(selectedLeague);
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };

    const groupedMatches = filteredMatches.reduce((acc, match) => {
        const date = match.matchdate.split('T')[0]; // Assuming match.matchdate is in ISO format
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(match);
        return acc;
    }, {});

    const formatLocalDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    return (
        <div className="match-data-container">
            <Navbar className="navbar" />
            <div className="filters">
                <label>
                    <span className="filter-label">League</span>
                    <select value={leagueFilter} onChange={e => handleLeagueChange(e.target.value)} className="filters-select">
                        <option value="">All</option>
                        {leagueOptions.map(league => (
                            <option key={league} value={league}>{league}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span className="filter-label">Home Team</span>
                    <select value={homeTeamFilter} onChange={e => setHomeTeamFilter(e.target.value)} className="filters-select">
                        <option value="">All</option>
                        {hometeamOptions.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </label>
                <label>
                <span className="filter-label">Away Team</span>
                    <select value={awayTeamFilter} onChange={e => setAwayTeamFilter(e.target.value)} className="filters-select">
                        <option value="">All</option>
                        {awayteamOptions.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span className="filter-label">Match Day</span>
                    <select value={matchDayFilter} onChange={e => setMatchDayFilter(e.target.value)} className="filters-select">
                        <option value="">All</option>
                        {matchdayOptions.map(matchday => (
                            <option key={matchday} value={matchday}>{matchday}</option>
                        ))}
                    </select>
                </label>
                <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
            </div>
            <div className="match-container">
                {/* Render grouped matches */}
                {Object.keys(groupedMatches).map((date, index) => (
                    <div key={index} className="date-group">
                        <h2 className="match-date">{formatDate(date)}</h2>
                        <ul className="match-list">
                            {groupedMatches[date].map((match, subIndex) => (
                                <li key={match._id || subIndex} className="match-list-wrapper">
                                    {/* Render all attributes of the match */}
                                    <span className="home-team">
                                        <span className="home-team-name">{match.homeTeamName}</span>
                                        <img src={match.homeTeamLogo} alt={`${match.homeTeamName} logo`} className="home-team-logo" />
                                    </span>
                                    <span className="match-item-time">{formatLocalDateTime(match.matchdate.split('T')[0])}</span>
                                    <span className="away-team">
                                        <img src={match.awayTeamLogo} alt={`${match.awayTeamName} logo`} className="away-team-logo" />
                                        <span className="away-team-name">{match.awayTeamName}</span>
                                    </span>
                                    <span className="match-item-venue">{match.matchVenueName}</span>
                                    <span>
                                        <Link to="/createParty" state = {{homeTeam: match.homeTeamName, awayTeam: match.awayTeamName, partyDate: formatDate(date)}}>
                                            <button className="invite-button">Invite to Party</button>
                                        </Link>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayMatch;
