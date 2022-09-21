// Create object with 2 functions one for X and one for O
let allTds = document.querySelectorAll('td')

const controlFlow = () => {
    const move = (option) => {
        allTds.forEach(el => {
            el.addEventListener('click', () => {
                // el.innerHTML = '<p>X</p>'
                el.innerHTML = option
            })
        })
    }
    return {move}
}

document.querySelector('button').addEventListener('click', () => {
    allTds.forEach(el => {
        el.innerHTML = ''
    })
})

let test1 = controlFlow()
moveX = test1.move('<p>X</p>')
moveO = test1.move('<p>O</p>')
console.log(moveX)
console.log(moveO)

const orderArr = [moveX, moveO, moveX, moveO, moveX, moveO, moveX, moveO, moveX]
orderArr.forEach(el => el)