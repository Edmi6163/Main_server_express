const Games = require('../models/games');
const axios = require('axios');

const quickSort = (arr, compareFn) => {
    if (arr.length <= 1) return arr;
    const [pivot, ...rest] = arr;
    const left = rest.filter(el => compareFn(el, pivot) < 0);
    const right = rest.filter(el => compareFn(el, pivot) >= 0);
    return [...quickSort(left, compareFn), pivot, ...quickSort(right, compareFn)];
};

const calculateScore = async () => {
    try {
        console.log('Fetching games from database...');
        const games = await Games.find();
        console.log(`Fetched ${games.length} games`);

        const competitionIds = [...new Set(games.map(game => game.competition_id))]; 
        console.log(`Found ${competitionIds.length} unique competition IDs`);

        const competitionBoards = {};

        competitionIds.forEach(competitionId => {
            console.log(`Processing competition ID: ${competitionId}`);
            const competitionGames = games.filter(game => game.competition_id === competitionId);
            const board = {};

            competitionGames.forEach(game => {
                const { home_club_name, away_club_name, home_club_goals, away_club_goals } = game;
                if (!board[home_club_name]) {
                    board[home_club_name] = {
                        team: home_club_name,
                        points: 0,
                        goals: 0,
                        goalsAgainst: 0,
                        matches: 0,
                        won: 0,
                        drawn: 0,
                        lost: 0
                    };
                }
                if (!board[away_club_name]) {
                    board[away_club_name] = {
                        team: away_club_name,
                        points: 0,
                        goals: 0,
                        goalsAgainst: 0,
                        matches: 0,
                        won: 0,
                        drawn: 0,
                        lost: 0
                    };
                }

                board[home_club_name].matches++;
                board[away_club_name].matches++;

                board[home_club_name].goals += home_club_goals;
                board[home_club_name].goalsAgainst += away_club_goals;
                board[away_club_name].goals += away_club_goals;
                board[away_club_name].goalsAgainst += home_club_goals;

                if (home_club_goals > away_club_goals) {
                    board[home_club_name].points += 3;
                    board[home_club_name].won++;
                    board[away_club_name].lost++;
                } else if (home_club_goals < away_club_goals) {
                    board[away_club_name].points += 3;
                    board[away_club_name].won++;
                    board[home_club_name].lost++;
                } else {
                    board[home_club_name].points++;
                    board[away_club_name].points++;
                    board[home_club_name].drawn++;
                    board[away_club_name].drawn++;
                }
            });

            const boardArray = Object.values(board);
            competitionBoards[competitionId] = quickSort(boardArray, (a, b) => b.points - a.points);
            competitionBoards[competitionId] = competitionBoards[competitionId].slice(0, 10); 
            console.log(`Processed competition ID ${competitionId} with ${boardArray.length} teams`);
        });

        console.log('Sending competition boards to frontend...');
        const send = await axios.post('http://localhost:3000/showScoreBoard', { data: competitionBoards });
        console.log('Data sent successfully');
        return { success: true, data: send.data };
    } catch (err) {
        console.error('Error calculating score:', err);
        throw err;
    }
};

module.exports = { calculateScore };