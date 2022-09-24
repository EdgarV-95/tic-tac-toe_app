// Creates a div called "container" that will store all the 9 cells.
// "index" is used to track the number of the cell when adding it to the "database" array below 
// gameBoard()() is a module as it needs to run straight away to set up the board we are going to be using
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
    // Inert the table after the h1 tag
    document.querySelector('h1').insertAdjacentElement('afterend', container)
})()

// This module contains all the game logic
const displayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const statusTxt = document.querySelector('.status');
    const resetBtn = document.querySelector('.reset');

    // "let gameIsRunning" tracks whether the game is currently in play
    let gameIsRunning = false;

    // "let database" tracks and stores the values of each cell on the board
    // It has 9 empty elements and it will be updated everytime the player clicks on a cell
    let database = ['', '', '', '', '', '', '', '', ''];

    // First player to start will be "X"
    let currentPlayer = 'X';

    // This function will take care of every user interaction with the board
    // Also update the cell text and database array
    function startGame() {
        
        // Set "gameIsRunning" to true to start the game. If anything changes it to false the gamee will stop
        gameIsRunning = true;
        // Updates the status field to the current player
        statusTxt.textContent = `${currentPlayer}'s turn`;

        // Clicking on any of the cells from inside the container will invoke clickCell
        cells.forEach(cell => cell.addEventListener('click', clickCell))

        function clickCell() {
            // Gets the attribute value of the "index" that has been clicked by the player
            const index = this.getAttribute('index');

            // I am using the "index" value of the cell as an index for the "database" array
            // if "database[index]"" is empty or "gameIsRunning" is set to true then carry on
            if (database[index] != '' || !gameIsRunning ) {
                return;
            }
            updateCell(this, index);
            checkWinner();
        }

        // Updates both the database at the index given and the cell text on the board
        const updateCell = (cell, index) => {
            database[index] = currentPlayer;
            cell.textContent = currentPlayer;
        }

        // Resets everything back to default
        // startGame() will re-start the game again
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

    // Logic to check who wins
    const checkWinner = () => {
        // All the possible patterns that win the game 
        const winningPatterns = [
            [0,1,2], [0,3,6], [0,4,8],
            [3,4,5], [1,4,7], [2,4,6],
            [6,7,8], [2,5,8]
        ];
        
        // Once there is a winner this will be changed to true
        let wonGame = false;

        // Iterates over all the winning pattern arrays 
        for (let i = 0; i < winningPatterns.length; i++) {
            // "pattern" stores the 3 element arrays returned from every iteration of "winningPatterns" 
            let pattern = winningPatterns[i];
            // Will store the first element if "pattern" and so on
            let cellOne = database[pattern[0]];
            let cellTwo = database[pattern[1]];
            let cellThree = database[pattern[2]];

            // If either cell is empty it means no winning pattern has been entered yet.
            if (cellOne == '' || cellTwo == '' || cellThree == '') {
                continue;
            }
            // If all cells have the same value it means a winning pattern has been found
            // sets wonGame to true
            if (cellOne == cellTwo && cellTwo == cellThree ) {
                wonGame = true;
                break;
            }
        }
        // If there is a winner then stop the game and update the status field
        if (wonGame) {
            gameIsRunning = false;
            statusTxt.textContent = `${currentPlayer} wins!`;
        } 
        // If "database" does not have any empty elements left then the game ended in a draw 
        else if (!database.includes('')) {
            gameIsRunning = false;
            statusTxt.textContent = 'Draw';
        }
        // This is the logic to change from one player to another as long the the conditions above have not been met
        // If currentPlayer is X then change to O or vice versa.
        // Updates the status field
        else {
            if (currentPlayer == 'X') {
                currentPlayer = 'O'
            } else {
                currentPlayer = 'X'
            };
            statusTxt.textContent = `${currentPlayer}'s turn`;
        }  
    }
    // Starts the game
    startGame()
})()