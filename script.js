// Create object with 2 functions one for X and one for O
let allTds = document.querySelectorAll('.cell')

const controlFlow = () => {
    const move = (mark, option) => {
        allTds.forEach(el => {
            el.addEventListener('click', () => {
                el.classList = mark
                el.innerHTML = option
            })
        })
    }
    // Check
    const playGame = () => {
        let x = document.querySelectorAll('.X')
        let o = document.querySelectorAll('.O')
        console.log()
        if ( x.length > o.length  ) {
            console.log('swap to O')
            game.move('cell O', 'O')
        }
        if ( o.length >= x.length ) {
            console.log('swap to X')
            game.move('cell X','X')
        }
    }
    return {move, playGame}
}

// Reset
document.querySelector('.reset').addEventListener('click', () => {
    allTds.forEach(el => {
        el.innerHTML = ''
    })
})

let game = controlFlow()
game.move('cell X','X')
document.querySelector('.container').addEventListener('click', game.playGame)