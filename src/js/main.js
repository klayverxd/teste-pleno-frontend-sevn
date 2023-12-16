import { handleButtonClick, updateButtonState } from "./handleButtons.js";
import { handleGamesPanel } from "./handlePanel.js";

async function fetchData() {
	try {
		const response = await fetch("https://sevn-pleno-esportes.deno.dev/");
		const data = await response.json();

		const firstRenderRound = 1;

		sessionStorage.setItem("data", JSON.stringify(data));
		sessionStorage.setItem("currentRound", firstRenderRound);
		updateButtonState(firstRenderRound);

		handleGamesPanel(firstRenderRound, data[0]);
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
