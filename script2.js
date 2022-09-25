const initializeGame = (() => {

    const welcomePage = document.querySelector('.welcome-page');
    const pvp = document.querySelector('.player-vs-player');
    const pve = document.querySelector('.player-vs-ai');
    const gameContainer = document.querySelector('.gameContainer');
    const submitBtn = document.querySelector('.submit');
    const cells = document.querySelectorAll('.cell');
    const statusTxt = document.querySelector('.status');
    const resetBtn = document.querySelector('.restartGame');
    const reloadBtn = document.querySelector('.reloadPage');

    pvp.addEventListener('pointerdown', () => {
        pvp.classList.add('active')
        pve.classList.remove('active')
    })

    pve.addEventListener('pointerdown', () => {
        pve.classList.add('active')
        pvp.classList.remove('active')
    })

    submitBtn.addEventListener('pointerdown', () => {
        welcomePage.style.opacity = '0';
        welcomePage.style.visibility = 'hidden';
        gameContainer.style.opacity = '1';
        gameContainer.style.visibility = 'visible';
    })

    let gameIsRunning = false;
    let database = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';

    function startGame() {
        gameIsRunning = true;
        statusTxt.textContent = `${currentPlayer}'s turn`

        cells.forEach(cell => cell.addEventListener('pointerdown', faszomCell));
        function faszomCell(e) {  
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
            statusTxt.textContent = `${currentPlayer} has won this round!`;
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

    resetBtn.addEventListener('pointerdown', () => {
        gameIsRunning = false;
        database = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        cells.forEach(cell => cell.textContent = '');
        startGame()
    })

    reloadBtn.addEventListener('pointerdown', () => {
        console.log('works')
        location.reload();
    })

    startGame()
})()