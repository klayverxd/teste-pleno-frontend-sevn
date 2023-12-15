function renderGamesPanel(data) {
	const gamesPanel = document.getElementById("games-panel-content");

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

async function fetchData() {
	try {
		const response = await fetch("https://sevn-pleno-esportes.deno.dev/");
		const data = await response.json();

		renderGamesPanel(data[0]);
	} catch (error) {
		console.error("Erro ao buscar dados da API:", error.message);
	}
}

fetchData();
