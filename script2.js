const gameBoard = (() => {
    const container = document.createElement('div');
    container.classList.add('container');
    container.innerHTML = 
    `
    <div index="0" class="cell"></div>
    <div index="1" class="cell"></div>
    <div index="2" class="cell"></div>
    <div index="3" class="cell"></div>
    <div index="4" class="cell"></div>
    <div index="5" class="cell"></div>
    <div index="6" class="cell"></div>
    <div index="7" class="cell"></div>
    <div index="8" class="cell"></div>
    `
    document.querySelector('h1').insertAdjacentElement('afterend', container)
})()

const initializeGame = (() => {
    const cells = document.querySelectorAll('.cell');
    const statusTxt = document.querySelector('.status');
    const resetBtn = document.querySelector('.reset');

    let gameIsRunning = false;
    let database = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';

    function startGame() {
        gameIsRunning = true;
        statusTxt.textContent = `${currentPlayer}'s turn`

        cells.forEach(cell => cell.addEventListener('click', cellClicked));
        function cellClicked(e) {    
            let index = this.getAttribute('index');
    
            if((e.target.textContent == 'X' || e.target.textContent == 'O') || !gameIsRunning ) {
                return
            }
            e.target.innerHTML = currentPlayer;
            database.splice(index, 1, e.target.innerHTML)
            checkWinner()        
        }
    }

    function checkWinner() {
        let winner = false;

        const winningPatterns = [
            [0,1,2], [0,3,6], [0,4,8],
            [3,4,5], [1,4,7], [2,4,6],
            [6,7,8], [2,5,8]
        ];

        for(let i = 0; i < winningPatterns.length; i++) {
            let pattern = winningPatterns[i];
            let cell0 = database[pattern[0]];
            let cell1 = database[pattern[1]];
            let cell2 = database[pattern[2]];

            if(cell0 == '' || cell1 == '' || cell2 == ''){
                continue;
            }

            if(cell0 == cell1 && cell1 == cell2) {
                winner = true;
                break;
            }
        }
        if(winner) {
            gameIsRunning = false;
            statusTxt.textContent = `Winner is: ${currentPlayer} !!`;
        }
        else if (!database.includes('')) {
            gameIsRunning = false;
            statusTxt.textContent = `Draw !!`
        }
        else {
            if (currentPlayer === 'X') {
                currentPlayer = 'O';
            } else if (currentPlayer === 'O') {
                currentPlayer = 'X';
            }
            statusTxt.textContent = `${currentPlayer}'s turn`;
        }
    }

    resetBtn.addEventListener('click', resetGame)
    function resetGame() {
        gameIsRunning = false;
        database = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        startGame()
    }
    startGame()
})()