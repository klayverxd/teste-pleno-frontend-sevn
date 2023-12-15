function renderGamesPanel(data) {
	const gamesPanel = document.getElementById("games-panel-content");

	gamesPanel.innerText = "";

	data.games.forEach((game, index) => {
		const gameDiv = document.createElement("div");
		gameDiv.classList.add("game-container");

		gameDiv.innerHTML = `
      <div class="team-home-container">
          <img src="./public/images/${game.team_home_id}.svg" alt="Logo ${game.team_home_name}" />
          <h4>${game.team_home_name}</h4>
          <h3>${game.team_home_score}</h3>
      </div>

      <img src="./public/images/icon-versus.svg" alt="versus ícone" />

      <div class="team-away-container">
          <img src="./public/images/${game.team_away_id}.svg" alt="Logo ${game.team_away_name}" />
          <h4>${game.team_away_name}</h4>
          <h3>${game.team_away_score}</h3>
      </div>
    `;

		if (index > 0) {
			const divider = document.createElement("hr");
			divider.classList.add("divider-solid");
			gamesPanel.appendChild(divider);
		}
		gamesPanel.appendChild(gameDiv);
	});
}

function renderRound(round) {
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
	const roundData = data || getRoundData(round);

	renderGamesPanel(roundData);
	renderRound(round);
}

function handleButtonClick(value) {
	let round = parseInt(sessionStorage.getItem("currentRound"));

	if (value === "left") handleGamesPanel(round - 1);
	else if (value === "right") handleGamesPanel(round + 1);
}

async function fetchData() {
	try {
		const response = await fetch("https://sevn-pleno-esportes.deno.dev/");
		const data = await response.json();

		sessionStorage.setItem("data", JSON.stringify(data));
		sessionStorage.setItem("currentRound", 1);

		handleGamesPanel(1, data[0]);
	} catch (error) {
		console.error("Erro ao buscar dados da API:", error.message);
	}
}

document
	.getElementById("left-button")
	.addEventListener("click", () => handleButtonClick("left"));
document
	.getElementById("right-button")
	.addEventListener("click", () => handleButtonClick("right"));

fetchData();
