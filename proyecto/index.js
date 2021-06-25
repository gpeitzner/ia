const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const boardWeight = [
	[100, -10, 11, 6, 6, 11, -10, 100],
	[-10, -20, 1, 2, 2, 1, -20, -10],
	[10, 1, 5, 4, 4, 5, 1, 10],
	[6, 2, 4, 2, 2, 4, 2, 6],
	[6, 2, 4, 2, 2, 4, 2, 6],
	[10, 1, 5, 4, 4, 5, 1, 10],
	[-10, -20, 1, 2, 2, 1, -20, -10],
	[100, -10, 11, 6, 6, 11, -10, 100],
];

function drawBoard(status) {
	let board = [];
	let statusIndex = 0;
	for (let i = 0; i < 8; i++) {
		let tmp = [];
		for (let j = 0; j < 8; j++) {
			tmp.push(parseInt(status[statusIndex]));
			statusIndex++;
		}
		board.push(tmp);
	}
	return board;
}

function getSoldiers(status, coinColor) {
	let statusIndex = 0;
	let soldiers = [];
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			if (parseInt(status[statusIndex]) === coinColor) {
				soldiers.push({ i: i, j: j });
			}
			statusIndex++;
		}
	}
	return soldiers;
}

function bubbleSort(data) {
	for (let i = 1; i < data.length; i++) {
		for (let j = 0; j < data.length - 1; j++) {
			if (data[j].score > data[j + 1].score) {
				let aux = data[j];
				data[j] = data[j + 1];
				data[j + 1] = aux;
			}
		}
	}
	return data.reverse();
}

function hunt(board, ourSoldiers, huntCoinColor) {
	let bestResults = [];
	for (let i = 0; i < ourSoldiers.length; i++) {
		const soldier = ourSoldiers[i];
		let summary = [];
		summary.push(huntRight(board, soldier, huntCoinColor));
		summary.push(huntFirstQuadrant(board, soldier, huntCoinColor));
		summary.push(huntUpper(board, soldier, huntCoinColor));
		summary.push(huntSecondQuadrant(board, soldier, huntCoinColor));
		summary.push(huntLeft(board, soldier, huntCoinColor));
		summary.push(huntThirdQuadrant(board, soldier, huntCoinColor));
		summary.push(huntDown(board, soldier, huntCoinColor));
		summary.push(huntFourthQuadrant(board, soldier, huntCoinColor));
		summary = summary.filter((item) => item != null);
		if (summary.length > 0) {
			summary = bubbleSort(summary);
			bestResults.push(summary[0]);
		}
	}
	if (bestResults.length > 0) {
		bestResults = bubbleSort(bestResults);
		return bestResults[0];
	}
	return;
}

function huntRight(board, soldier, huntCoinColor) {
	let score = 0;
	let i = soldier.i;
	for (let j = soldier.j + 1; j < 8; j++) {
		if (board[i][j] === huntCoinColor) {
			score++;
		} else if (board[i][j] === 2 && score > 0) {
			return { i: i, j: j, score: boardWeight[i][j] };
		} else {
			return;
		}
	}
	return;
}

function huntFirstQuadrant(board, soldier, huntCoinColor) {
	let score = 0;
	let j = soldier.j + 1;
	for (let i = soldier.i - 1; i >= 0 && j < 8; i--, j++) {
		if (board[i][j] === huntCoinColor) {
			score++;
		} else if (board[i][j] === 2 && score > 0) {
			return { i: i, j: j, score: boardWeight[i][j] };
		} else {
			return;
		}
	}
	return;
}

function huntUpper(board, soldier, huntCoinColor) {
	let score = 0;
	let j = soldier.j;
	for (let i = soldier.i - 1; i >= 0; i--) {
		if (board[i][j] === huntCoinColor) {
			score++;
		} else if (board[i][j] === 2 && score > 0) {
			return { i: i, j: j, score: boardWeight[i][j] };
		} else {
			return;
		}
	}
	return;
}

function huntSecondQuadrant(board, soldier, huntCoinColor) {
	let score = 0;
	let j = soldier.j - 1;
	for (let i = soldier.i - 1; i >= 0 && j >= 0; i--, j--) {
		if (board[i][j] === huntCoinColor) {
			score++;
		} else if (board[i][j] === 2 && score > 0) {
			return { i: i, j: j, score: boardWeight[i][j] };
		} else {
			return;
		}
	}
	return;
}

function huntLeft(board, soldier, huntCoinColor) {
	let score = 0;
	let i = soldier.i;
	for (let j = soldier.j - 1; j >= 0; j--) {
		if (board[i][j] === huntCoinColor) {
			score++;
		} else if (board[i][j] === 2 && score > 0) {
			return { i: i, j: j, score: boardWeight[i][j] };
		} else {
			return;
		}
	}
	return;
}

function huntThirdQuadrant(board, soldier, huntCoinColor) {
	let score = 0;
	let j = soldier.j - 1;
	for (let i = soldier.i + 1; i < 8 && j >= 0; i++, j--) {
		if (board[i][j] === huntCoinColor) {
			score++;
		} else if (board[i][j] === 2 && score > 0) {
			return { i: i, j: j, score: boardWeight[i][j] };
		} else {
			return;
		}
	}
	return;
}

function huntDown(board, soldier, huntCoinColor) {
	let score = 0;
	let j = soldier.j;
	for (let i = soldier.i + 1; i < 8; i++) {
		if (board[i][j] === huntCoinColor) {
			score++;
		} else if (board[i][j] === 2 && score > 0) {
			return { i: i, j: j, score: boardWeight[i][j] };
		} else {
			return;
		}
	}
	return;
}

function huntFourthQuadrant(board, soldier, huntCoinColor) {
	let score = 0;
	let j = soldier.j + 1;
	for (let i = soldier.i + 1; i < 8 && j < 8; i++, j++) {
		if (board[i][j] === huntCoinColor) {
			score++;
		} else if (board[i][j] === 2 && score > 0) {
			return { i: i, j: j, score: boardWeight[i][j] };
		} else {
			return;
		}
	}
	return;
}

app.get("/", (req, res) => {
	const coinColor = parseInt(req.query.turno);
	const status = req.query.estado;
	const huntCoinColor = parseInt(coinColor) === 0 ? 1 : 0;
	const board = drawBoard(status);
	const ourSoldiers = getSoldiers(status, coinColor);
	const bestHint = hunt(board, ourSoldiers, huntCoinColor);
	console.log(bestHint);
	res.send(bestHint.i.toString() + bestHint.j.toString());
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
