const Games = require('../models/games')

function quickSort(arr,compare){
	if(arr.length <= 1){
		return arr;
	}

	const pivot = arr[arr.length -1];
	const left = [];
	const right = [];

	for(let i = 0; i < arr.length -1; i++){
		if(compare(arr[i],pivot) < 0){
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return [...quickSort(left,compare),pivot,...quickSort(right,compare)];
}

const calculateScore = async() => {
	const games = await Games.find();
	const board = {};

	games.forEach(game => {
		const {home_club_name,away_club_name,home_club_goals,away_club_goals} = game;
		if(!board[home_club_name]) board[home_club_name] = {team: home_club_name, points: 0, goals: 0, goalsAgainst: 0, matches: 0};
		if(!board[away_club_name]) board[away_club_name] = {team: away_club_name, points: 0, goals: 0, goalsAgainst: 0, matches: 0};

		board[home_club_name].played++;
		board[away_club_name].played++;

		if(home_club_goals > away_club_goals){
			board[home_club_name].points += 3;
			board[home_club_name].won++;
			board[away_club_name].lost++;
		} else if(home_club_goals < away_club_goals){
			board[away_club_name].points += 3;
			board[away_club_name].won++;
			board[home_club_name].lost++;
		} else {
			board[home_club_name].points++;
			board[away_club_name].points++;
			board[home_club_name].drawn++;
			board[away_club_name].drawn++;
		}
		const boardArray = Object.values(board)
		return quickSort(boardArray, (a, b) => b.points - a.points);

	})
}

module.exports = {calculateScore}