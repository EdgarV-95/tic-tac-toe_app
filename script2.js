
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

const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const statusTxt = document.querySelector('.status');
    const resetBtn = document.querySelector('.reset');

    let gameIsRunning = false;
    let database = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';

    function startGame() {
        gameIsRunning = true;
        statusTxt.textContent = `${currentPlayer}'s turn`;

        cells.forEach(cell => cell.addEventListener('click', clickCell))
        function clickCell() {
            const index = this.getAttribute('index');

            if (database[index] != '' || !gameIsRunning ) {
                return;
            }
            updateCell(this, index);
            checkWinner();
        }

        const updateCell = (cell, index) => {
            database[index] = currentPlayer;
            cell.textContent = currentPlayer;
        }

        resetBtn.addEventListener('click', resetGame);
        function resetGame() {
            database = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameIsRunning = false;
            statusTxt.textContent = `${currentPlayer}'s turn`;
            cells.forEach(cell => {cell.textContent = ''});
            startGame()
        }
    }

    const checkWinner = () => {
        const winningPatterns = [
            [0,1,2], [0,3,6], [0,4,8],
            [3,4,5], [1,4,7], [2,4,6],
            [6,7,8], [2,5,8]
        ];
        
        let wonGame = false;

        for (let i = 0; i < winningPatterns.length; i++) {
            let pattern = winningPatterns[i];
            let cellOne = database[pattern[0]];
            let cellTwo = database[pattern[1]];
            let cellThree = database[pattern[2]];

            if (cellOne == '' || cellTwo == '' || cellThree == '') {
                continue;
            }
            if (cellOne == cellTwo && cellTwo == cellThree ) {
                wonGame = true;
                break;
            }
        }
        if (wonGame) {
            gameIsRunning = false;
            statusTxt.textContent = `${currentPlayer} wins!`;
        } 
        else if (!database.includes('')) {
            gameIsRunning = false;
            statusTxt.textContent = 'Draw';
        }
        else {
            if (currentPlayer == 'X') {
                currentPlayer = 'O'
            } else {
                currentPlayer = 'X'
            };
            statusTxt.textContent = `${currentPlayer}'s turn`;
        }  
    }
    startGame()
})()