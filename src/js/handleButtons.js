import { handleGamesPanel } from "./handlePanel.js";

function updateButtonState(round) {
	const leftButton = document.getElementById("left-button");
	const rightButton = document.getElementById("right-button");

	leftButton.classList.remove("disabled");
	rightButton.classList.remove("disabled");

	leftButton.disabled = round === 1;
	rightButton.disabled = round === 14;

	if (round === 1) leftButton.classList.add("disabled");
	else if (round === 14) rightButton.classList.add("disabled");
}

function handleButtonClick(value) {
	let nextRoundPage = null;
	let currentRound = parseInt(sessionStorage.getItem("currentRound"));

	if (value === "left") nextRoundPage = currentRound - 1;
	else if (value === "right") nextRoundPage = currentRound + 1;

	handleGamesPanel(nextRoundPage);
	updateButtonState(nextRoundPage);
}

export { updateButtonState, handleButtonClick };
