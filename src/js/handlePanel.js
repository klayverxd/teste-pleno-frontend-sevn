function createTeamContainer(teamType, teamId, teamName, teamScore) {
	return `
			<div class="team-${teamType}-container">
					<img src="./src/public/images/${teamId}.svg" alt="Logo ${teamName}">
					<h4>${teamName}</h4>
					<h3>${teamScore}</h3>
			</div>
	`;
}

function createGameContainer(game) {
	const gameDiv = document.createElement("div");
	gameDiv.classList.add("game-container");

	const homeContainer = createTeamContainer(
		"home",
		game.team_home_id,
		game.team_home_name,
		game.team_home_score
	);
	const awayContainer = createTeamContainer(
		"away",
		game.team_away_id,
		game.team_away_name,
		game.team_away_score
	);

	gameDiv.innerHTML += homeContainer;
	gameDiv.innerHTML += `
		<img src="./src/public/images/icon-versus.svg" alt="versus ícone" />
		`;
	gameDiv.innerHTML += awayContainer;

	return gameDiv;
}

function renderGamesPanel(dataGames) {
	const gamesPanel = document.getElementById("games-panel-content");

	gamesPanel.innerText = "";

	dataGames.games.forEach((game, index) => {
		const gameContainer = createGameContainer(game);

		if (index > 0) {
			const divider = document.createElement("hr");
			divider.classList.add("divider-solid");
			gamesPanel.appendChild(divider);
		}
		gamesPanel.appendChild(gameContainer);
	});
}

function renderRoundNumber(round) {
	const roundHeader = document.querySelector(".header-games-panel-content h5");
	roundHeader.textContent = `Rodada ${round}`;

	sessionStorage.setItem("currentRound", round);
}

function getRoundData(roundNumber) {
	const data = JSON.parse(sessionStorage.getItem("data")) || [];
	const roundData = data.find(games => games.round == roundNumber);

	return roundData;
}

function handleGamesPanel(round, data = null) {
	const dataGames = data || getRoundData(round);

	renderGamesPanel(dataGames);
	renderRoundNumber(round);
}

export { handleGamesPanel };
