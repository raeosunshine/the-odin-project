const rootEl = document.getElementById("#root");

function renderCurrentRound(round = 0) {
	const roundCountEl = document.querySelector("#round-count");
	roundCountEl.textContent = round;
}

function renderPlayerScore(userScore = 0, botScore = 0) {
	const userScoreEl = document.querySelector("#user-score");
	const botScoreEl = document.querySelector("#bot-score");

	userScoreEl.textContent = userScore;
	botScoreEl.textContent = botScore;
}

function getEmoji(option) {
	let emoji = "";

	switch (option) {
		case "rock": {
			emoji = "✊"
			break;
		}
		case "paper": {
			emoji = "🖐️"
			break;
		}
		case "scissors": {
			emoji = "✌️"
			break;
		}

		default: {
			console.error(`Invalid option: ${option}`)
			break;
		}
	}

	return emoji;
}

// // randomly returns computer choice
// // 'rock', 'paper', and 'scissors'
function getBotPick() {
	const random = Math.floor(Math.random() * 3); // random either 0, 1, 2

	if (random === 0) {
		return "rock";
	}

	if (random === 1) {
		return "paper";
	}

	return "scissors"; // must be random === 2
}

function renderPick(userPick, botPick) {
	const userPickEl = document.querySelector("#user-pick");
	const botPickEl = document.querySelector("#bot-pick");

	userPickEl.textContent = getEmoji(userPick);
	botPickEl.textContent = getEmoji(botPick);
}

function getWinner(userPick, botPick) {
	if (userPick === botPick) {
		return "draw";
	}

	const isUserWinning = userPick === "paper" && botPick === "rock" || userPick === "rock" && botPick === "scissors" || userPick === "scissors" && botPick === "paper";

	return isUserWinning ? "user" : "bot";
}

function renderRoundState(winner) {
	const roundStateEl = document.querySelector("#round-state");

	switch (winner) {
		case "user": {
			roundStateEl.textContent = "lost to";

			break;
		}
		case "bot": {
			roundStateEl.textContent = "won over";

			break;
		}
		case "draw": {
			roundStateEl.textContent = "=";

			break;
		}
		default: {
			console.error(`Invalid winner: ${winner}`);
			break;
		}
	}
}

function endGame(winner) {
	// disabled console
	const consoleEl = document.querySelector("#console");
	consoleEl.childNodes.forEach(node => {
		node.disabled = true;
	});

	// mark winner
	const userStateEl = document.querySelector("#user-state");
	const botStateEl = document.querySelector("#bot-state");

	if (winner === "user") {
		userStateEl.classList.add("winner");
	} else if (winner === "bot") {
		botStateEl.classList.add("winner");
	}
}

let round = 0;
let userScore = 0;
let botScore = 0;
function handleGame(userPick) {
	const botPick = getBotPick();

	renderPick(userPick, botPick);

	// update round
	round += 1;
	renderCurrentRound(round);

	// check winner and update score
	const winner = getWinner(userPick, botPick);
	if (winner === "user") {
		userScore += 1;
	} else if (winner === "bot") {
		botScore += 1;
	}
	renderPlayerScore(userScore, botScore);
	renderRoundState(winner);


	// end game if round === 5
	if (round === 5) {
		const gameWinner = userScore === botScore ? "draw" : userScore > botScore ? "user" : "bot";
		endGame(gameWinner);
	}
}

function handleConsole() {
	const consoleEl = document.querySelector("#console");

	const handleClick = (e) => {
		const target = e.target;

		switch (target.title) {
			case "rock":
			case "paper":
			case "scissors": {
				handleGame(target.title);

				break;
			}
			default: {
				console.error(`Involid option: ${target}`);
				break;
			}
		}
	}

	consoleEl.addEventListener("click", handleClick);
}

function init() {
	renderCurrentRound();
	renderPlayerScore();

	handleConsole();

	console.log("init ui");
}

function restartGame() {
	const restartGameEl = document.querySelector("#restart");

	restartGameEl.addEventListener("click", () => {
		window.location.reload();
	});
}

init();
restartGame();