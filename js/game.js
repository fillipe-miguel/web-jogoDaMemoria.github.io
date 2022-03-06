let game = {
	lockMode: false,
	firstCard: null,
	secondCard: null,

	cards: [],

	// PRESO AQUI ME AJUDA DEUS

	setCards: function (id) {
		let card = this.cards.filter((card) => {
			return card.id === id;
		})[0];

		if (card.flipped || this.lockMode) {
			console.log('aqui');
			return false;
		}

		if (!this.firstCard) {
			this.firstCard = card;
			this.firstCard.flipped = true;
			return true;
		} else {
			this.secondCard = card;
			this.secondCard.flipped = true;
			this.lockMode = true;
			return true;
		}
	},

	checkMatch: function () {
		if (!this.firstCard || !this.secondCard) {
			return false;
		}
		return this.firstCard.icon == this.secondCard.icon;
	},

	clearCards: function () {
		console.log(this.firstCard);
		console.log(this.secondCard);

		this.firstCard = null;
		this.secondCard = null;
		this.lockMode = false;
	},

	unflipedCards: function () {
		this.firstCard.flipped = false;
		this.secondCard.flipped = false;

		this.clearCards();
	},

	checkOver: function () {
		return (
			this.cards.filter((card) => {
				return !card.flipped;
			}).length == 0
		);
	},

	techs: [
		'bootstrap',
		'css',
		'electron',
		'firebase',
		'html',
		'javascript',
		'jquery',
		'mongo',
		'node',
		'react',
	],

	createCards: function () {
		for (let tech of this.techs) {
			this.cards.push(this.createPairs(tech));
		}

		this.cards = this.cards.flatMap((pair) => pair);
		this.shuffleCards();

		return this.cards;
	},

	createPairs: function (tech) {
		return [
			{ id: this.generateId(tech), icon: tech, flipped: false },
			{ id: this.generateId(tech), icon: tech, flipped: false },
		];
	},

	generateId: function (tech) {
		return tech + parseInt(Math.random() * 1000);
	},

	shuffleCards: function () {
		let currentIndex = this.cards.length;
		let randomIndex;

		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[this.cards[currentIndex], this.cards[randomIndex]] = [
				this.cards[randomIndex],
				this.cards[currentIndex],
			];
		}
		return game.cards;
	},
};
