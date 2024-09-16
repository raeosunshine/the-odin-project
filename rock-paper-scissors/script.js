// randomly returns computer choice
// 'rock', 'paper', and 'scissors'
function getComputerChoice() {
	const random = Math.floor(Math.random() * 3); // random either 0, 1, 2

	if (random === 0) {
		return "rock";
	}

	if (random === 1) {
		return "paper";
	}

	return "scissors"; // must be random === 2
}

function getHumanChoice() {
	const input = prompt(`
		Disclaimer: A typo could lead to your defeat. Please enter your choice carefully.

		REMEMBER: Rock, Paper, or Scissors!
	`) || ""; // set to empty string if it's null
	const choice = input.toLowerCase(); // to handle case sensitivity

	return choice;
}

function isWinning(first, second) {
	return first === "paper" && second === "rock" || first === "rock" && second === "scissors" || first === "scissors" && second === "paper";
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getWinner(humanScore, computerScore) {
	if(humanScore === computerScore) {
		return alert("It's a draw!");
	}

	if(humanScore > computerScore) {
		return alert("Congratulations! You win!");
	}

	return alert("Sorry, you lose.")
}

function isValidChoice(choice) {
	return choice === "paper" || choice === "rock" || choice === "scissors";
}


function playGame() {
	let humanScore = 0;
	let computerScore = 0;
	let round = 0;

	function roundResultAlert(humanChoice, computerChoice, message) {
		alert(`
			Round ${round + 1}

			You: ${capitalize(humanChoice || "-")} | Computer: ${capitalize(computerChoice)}
			${message}

			You: ${humanScore} | Computer: ${computerScore}
		`);
	}

	function playRound(humanChoice, computerChoice) {
		if (isWinning(humanChoice, computerChoice)) {
			humanScore += 1;
			roundResultAlert(
				humanChoice,
				computerChoice,
				`You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`
			);
		} else if (isWinning(computerChoice, humanChoice) || !isValidChoice(humanChoice)) {
			computerScore += 1;
			roundResultAlert(
				humanChoice,
				computerChoice,
				`You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice || "-")}`
			);
		} else {
			roundResultAlert(humanChoice, computerChoice, "It's a draw!");
		}
	}

	// Play the game 5 rounds
	while(round < 5) {
		playRound(getHumanChoice(), getComputerChoice());
		round += 1;
	}

	// Announce the winner
	getWinner(humanScore, computerScore);
}

const input = confirm(`
	Welcome to Odin Rock, Paper, and Scissors!
	Let's play 5-round game, shall we?
`);

if(input) {
	playGame();
} else {
	alert("That's unfortunate. Hope to play with you some other time!")
}
