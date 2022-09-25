const player = (name) => {
    const updateName = () => `${name}'s turn`;
    return {name, updateName};
}

const initializeGame = (() => {

    const welcomePage = document.querySelector('.welcome-page');
    const gameContainer = document.querySelector('.gameContainer');
    const submitBtn = document.querySelector('.submit');
    const cells = document.querySelectorAll('.cell');
    const statusTxt = document.querySelector('.status');
    const resetBtn = document.querySelector('.restartGame');
    const reloadBtn = document.querySelector('.reloadPage');

    const gameTest = () => {
        player1 = player(document.getElementById("player1").value);
        player2 = player(document.getElementById("player2").value);

        if(player1.name === '' || player2.name === '') {
            alert('Must give player names')
            return;
        }
        if(player1.name.length < 3 || player2.name.length < 3) {
            alert('Names must be at least 3 characters long')
            return;
        }
        if(player1.name === player2.name) {
            alert('Cant have the same names')
            return;
        }
        // const welcomePage = document.querySelector('.welcome-page');
        welcomePage.style.opacity = '0';
        welcomePage.style.visibility = 'hidden';
    
        // const gameContainer = document.querySelector('.gameContainer');
        gameContainer.style.opacity = '1';
        gameContainer.style.visibility = 'visible';
    }
    submitBtn.addEventListener('click', gameTest)

    let gameIsRunning = false;
    let database = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let currentPlayerName = player1.name;

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
            statusTxt.textContent = `${currentPlayerName} has won this round!`;
        }
        else if (!database.includes('')) {
            gameIsRunning = false;
            statusTxt.textContent = `Draw !!`
        }
        else {
            if (currentPlayer === 'X') {
                currentPlayer = 'O';
                currentPlayerName = player2.name;
            } else if (currentPlayer === 'O') {
                currentPlayer = 'X';
                currentPlayerName = player1.name;
            }
            statusTxt.textContent = `${currentPlayer}'s turn`;
        }
    }

    resetBtn.addEventListener('click', () => {
        gameIsRunning = false;
        database = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        startGame()
    })

    reloadBtn.addEventListener('click', () => {
        console.log('works')
        location.reload();
    })

    startGame()
})()