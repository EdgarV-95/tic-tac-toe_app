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
    return {move}
}

// Reset
document.querySelector('.reset').addEventListener('click', () => {
    allTds.forEach(el => {
        el.innerHTML = ''
    })
})

let game = controlFlow()
game.move('cell X','X')

// Check
const playGame = () => {
    let x = document.body.querySelectorAll('.X')
    let o = document.body.querySelectorAll('.O')
    console.log(x)
    if ( document.querySelector('.X').textContent ) {
        console.log('swap to O')
        game.move('cell O', 'O')
        x.classList = 'cell'
    } else
    if ( document.querySelector('.O').textContent ) {
        console.log('swap to X')
        game.move('cell X','X')
        o.innerHTML = 'cell'
    } else {
        console.log('Im done')
    }
}
document.querySelector('.check').addEventListener('click', playGame)