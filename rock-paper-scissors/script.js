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
	const input = prompt("Enter your signal: rock, paper, or scissors.");
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


function playGame() {
	let humanScore = 0;
	let computerScore = 0;
	let round = 0;

	function resultAlert(humanChoice, computerChoice, message) {
		alert(`
			Round ${round + 1}

			You: ${capitalize(humanChoice)} | Computer: ${capitalize(computerChoice)}
			${message}

			You: ${humanScore} | Computer: ${computerScore}
		`);
	}

	function playRound(humanChoice, computerChoice) {
		if (isWinning(humanChoice, computerChoice)) {
			humanScore += 1;
			resultAlert(
				humanChoice,
				computerChoice,
				`You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}`
			);
		} else if (isWinning(computerChoice, humanChoice)) {
			computerScore += 1;
			resultAlert(
				humanChoice,
				computerChoice,
				`You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}`
			);
		} else {
			resultAlert(humanChoice, computerChoice, "It's a draw!");
		}
	}

	while(round < 5) {
		playRound(getHumanChoice(), getComputerChoice());
		round += 1;
	}

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
