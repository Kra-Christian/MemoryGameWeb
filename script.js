document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    let gameBoard = document.getElementById('game-board');
    let status = document.getElementById('status');
    let restartBtn = document.getElementById('restart-btn');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;

    // Shuffle cards
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // Create card elements
    function createBoard() {
        const shuffledCards = shuffle(cardsArray);
        shuffledCards.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="front"></div>
                <div class="back">${value}</div>
            `;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    // Flip card
    function flipCard() {
        if (lockBoard || this === firstCard) return;
        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Check if cards match
    function checkForMatch() {
        let isMatch = firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent;

        isMatch ? disableCards() : unflipCards();
    }

    // Disable matched cards
    function disableCards() {
        matchedPairs++;
        resetBoard();
        if (matchedPairs === cardsArray.length / 2) {
            status.textContent = 'Félicitations ! Vous avez gagné !';
        }
    }

    // Unflip cards
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Reset board
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // Restart game
    function restartGame() {
        gameBoard.innerHTML = '';
        status.textContent = '';
        matchedPairs = 0;
        createBoard();
    }

    restartBtn.addEventListener('click', restartGame);

    createBoard();
});
