const CARD = 'card';
const FRONT = 'card_front';
const BACK = 'card_back';
const ICON = 'icon';
const FLIP = 'flip';

let view = [];

startGame();

function startGame() {
	initializeCards(game.createCards());
	setTimeout(() => {
		setView(2000);
	}, 500);
}

function initializeCards(cards) {
	let gameBoard = document.getElementById('gameBoard');

	cards.forEach((card) => {
		let cardElement = document.createElement('div');
		view.push(cardElement);
		cardElement.id = card.id;
		cardElement.classList.add(CARD);
		cardElement.dataset.icon = card.icon;

		createCardContent(card, cardElement);

		cardElement.addEventListener('click', flip);

		gameBoard.appendChild(cardElement);
		view.push(cardElement);
	});
}

function setView(time) {
	console.log('estou aqui');
	view.forEach((card) => {
		card.classList.add(FLIP);
		setTimeout(() => {
			card.classList.remove(FLIP);
		}, time);
	});
}

function createCardContent(card, cardElement) {
	createCardFace(FRONT, card, cardElement);
	createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, cardElement) {
	let cardElementFace = document.createElement('div');
	cardElementFace.classList.add(face);

	if (face === FRONT) {
		let iconElement = document.createElement('img');
		iconElement.classList.add(ICON);
		iconElement.src = './assets/img/' + card.icon + '.png';
		cardElementFace.appendChild(iconElement);
	} else {
		cardElementFace.innerHTML = '&lt/&gt';
	}

	cardElement.appendChild(cardElementFace);
}

function flip() {
	if (game.setCards(this.id)) {
		this.classList.add(FLIP);
		if (game.secondCard) {
			if (game.checkMatch()) {
				game.clearCards();
				if (game.checkOver()) {
					document.getElementById('gameOver').style.display = 'flex';
				}
			} else {
				setTimeout(() => {
					let firstCardView = document.getElementById(
						game.firstCard.id
					);
					let secondCardview = document.getElementById(
						game.secondCard.id
					);

					firstCardView.classList.remove(FLIP);
					secondCardview.classList.remove(FLIP);
					game.unflipedCards();
				}, 1000);
			}
		}
	}
}

function unflipAll() {
	for (let card of game.cards) {
		let cd = document.getElementById(card.id);
		cd.classList.remove(FLIP);
		card.flipped = false;
	}
}

function restart() {
	document.getElementById('gameOver').style.display = 'none';
	unflipAll();
	let gameBoard = document.getElementById('gameBoard');
	gameBoard.innerHTML = '';
	game.cards = [];
	startGame();
}
