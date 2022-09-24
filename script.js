const cells = document.querySelectorAll('.cell');
const statusTxt = document.querySelector('.status');
const resetBtn = document.querySelector('.reset');

const gameBoard = () => {

    let options = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let running = false;

    return {options, currentPlayer, running}
}

const gameFlow = (() => {

    game = gameBoard();

    const winConditions = [
        [0,1,2], [0,3,6], [0,4,8],
        [3,4,5], [1,4,7], [2,4,6],
        [6,7,8], [2,5,8]
    ];

    function initializeGame() {
        cells.forEach(cell => cell.addEventListener('click', cellClicked))
        function cellClicked() {
            const cellIndex = this.getAttribute('cellIndex');
    
            if (game.options[cellIndex] != '' || !game.running ) {
                return;
            }
            updateCell(this, cellIndex);
            checkWinner();
        }
        resetBtn.addEventListener('click', restartGame);
        statusTxt.textContent = `${game.currentPlayer}'s turn`;
        game.running = true;
    }
    
    const updateCell = (cell, index) => {
        game.options[index] = game.currentPlayer;
        cell.textContent = game.currentPlayer;
    }
    
    const changePlayer = () => {
        game.currentPlayer = (game.currentPlayer == 'X') ? 'O' : 'X';
        statusTxt.textContent = `${game.currentPlayer}'s turn`;
    }
    
    const checkWinner = () => {
        let roundWon = false;

        for (let i = 0; i < winConditions.length; i++) {
            let condition = winConditions[i];
            let cellA = game.options[condition[0]];
            let cellB = game.options[condition[1]];
            let cellC = game.options[condition[2]];

            if (cellA == '' || cellB == '' || cellC == '') {
                continue;
            }

            if (cellA == cellB && cellB == cellC ) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusTxt.textContent = `${game.currentPlayer} wins!`;
            game.running = false;
        } 
        else if (!game.options.includes('')) {
            statusTxt.textContent = 'Draw';
            game.running = false;
        } 
        else {
            changePlayer();
        }
    }

    const restartGame = () => {

    }

    initializeGame()
})()