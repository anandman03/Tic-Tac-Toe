console.log('Your JS is linked up. Be the person you needed when you were little.')

let player = ''
let computer = ''
let canMove = true
let gameStatus = true
const size = 9

let currentGameState = ['', '', '', '', '', '', '', '', '']

const winMessage = () => (canMove) ? `Player Wins !` : `Computer Win's`
const drawMessage = () => `The Game ended in a Draw !`

function clearBoard() {
    document.querySelectorAll('#cell').forEach(cell => cell.innerHTML = '')
    for(let i = 0 ; i < size ; i++) {
        currentGameState[i] = ''
    }
    player = ''
    computer = ''
    canMove = gameStatus = true
}

function userInput(choice) {
    player = choice
    computer = (player == 'X') ? 'O' : 'X'
    const choiceSection = document.querySelector('#choice')
    const boardSection = document.querySelector('#board')

    choiceSection.style.visibility = 'hidden'
    boardSection.style.visibility = 'visible'
}

function UserplayMove(clickedCell, clickedCellIndex) {
    currentGameState[clickedCellIndex] = player
    clickedCell.innerHTML = player
}

function claimWin() {
    document.querySelector('#final-screen').style.visibility = 'visible'
    document.querySelector('#board').style.visibility = 'hidden'

    const winner = document.querySelector('#winner')
    winner.innerHTML = winMessage()
    gameStatus = false
}

function checkDraw() {
    let roundDraw = !currentGameState.includes('')
    if(!roundDraw) {
        return
    }
    
    document.querySelector('#final-screen').style.visibility = 'visible'
    document.querySelector('#board').style.visibility = 'hidden'

    const winner = document.querySelector('#winner')
    winner.innerHTML = drawMessage()
    gameStatus = false
}

function changePlayer() {
    canMove = (canMove == true) ? false : true
    if(!canMove) {
        computerPlay()
    }
}

function resultValidation() {
    const winMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for(let i = 0 ; i < winMoves.length ; i++) {
        const check = winMoves[i]
        let cell1 = currentGameState[check[0]]
        let cell2 = currentGameState[check[1]]
        let cell3 = currentGameState[check[2]]

        if(cell1 == cell2 && cell1 == cell3 && cell1 != '') {
            claimWin()
            return
        }
    }
    checkDraw()
    changePlayer()
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'))

    if(currentGameState[clickedCellIndex] != '' || !canMove || !gameStatus) {
        return
    }
    UserplayMove(clickedCell, clickedCellIndex)
    resultValidation()
}

function computerPlay() {
    //If there is a chance to Win

    if(currentGameState[0] == '' && ((currentGameState[1] == computer && computer == currentGameState[2]) || (currentGameState[4] == computer && computer == currentGameState[8]) || (currentGameState[3] == computer && computer == currentGameState[6]))) {
        currentGameState[0] = computer
        document.querySelector('td[cell-index="0"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[1] == '' && ((currentGameState[0] == computer && computer == currentGameState[2]) || (currentGameState[4] == computer && computer == currentGameState[7]))) {
        currentGameState[1] = computer
        document.querySelector('td[cell-index="1"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[2] == '' && ((currentGameState[0] == computer && computer == currentGameState[1]) || (currentGameState[5] == computer && computer == currentGameState[8]) || (currentGameState[4] == computer && computer == currentGameState[6]))) {
        currentGameState[2] = computer
        document.querySelector('td[cell-index="2"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[3] == '' && ((currentGameState[0] == computer && computer == currentGameState[6]) || (currentGameState[4] == computer && computer == currentGameState[5]))) {
        currentGameState[3] = computer
        document.querySelector('td[cell-index="3"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[4] == '' && ((currentGameState[3] == computer && computer == currentGameState[5]) || (currentGameState[1] == computer && computer == currentGameState[7]) || (currentGameState[0] == computer && computer == currentGameState[8]) || (currentGameState[2] == computer && computer == currentGameState[6]))) {
        currentGameState[4] = computer
        document.querySelector('td[cell-index="4"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[5] == '' && ((currentGameState[3] == computer && computer == currentGameState[4]) || (currentGameState[2] == computer && computer == currentGameState[8]))) {
        currentGameState[5] = computer
        document.querySelector('td[cell-index="5"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[6] == '' && ((currentGameState[1] == computer && computer == currentGameState[3]) || (currentGameState[7] == computer && computer == currentGameState[8]) || (currentGameState[2] == computer && computer == currentGameState[4]))) {
        currentGameState[6] = computer
        document.querySelector('td[cell-index="6"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[7] == '' && ((currentGameState[1] == computer && computer == currentGameState[4]) || (currentGameState[6] == computer && computer == currentGameState[8]))) {
        currentGameState[7] = computer
        document.querySelector('td[cell-index="7"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[8] == '' && ((currentGameState[0] == computer && computer == currentGameState[4]) || (currentGameState[7] == computer && computer == currentGameState[6]) || (currentGameState[2] == computer && computer == currentGameState[5]))) {
        currentGameState[8] = computer
        document.querySelector('td[cell-index="8"]').innerHTML = computer
        resultValidation()
        return
    }

    //If there is a chance to block.
    if(currentGameState[0] == '' && ((currentGameState[1] == player && player == currentGameState[2]) || (currentGameState[4] == player && player == currentGameState[8]) || (currentGameState[3] == player && player == currentGameState[6]))) {
        currentGameState[0] = computer
        document.querySelector('td[cell-index="0"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[1] == '' && ((currentGameState[0] == player && player == currentGameState[2]) || (currentGameState[4] == player && player == currentGameState[7]))) {
        currentGameState[1] = computer
        document.querySelector('td[cell-index="1"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[2] == '' && ((currentGameState[0] == player && player == currentGameState[1]) || (currentGameState[5] == player && player == currentGameState[8]) || (currentGameState[4] == player && player == currentGameState[6]))) {
        currentGameState[2] = computer
        document.querySelector('td[cell-index="2"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[3] == '' && ((currentGameState[0] == player && player == currentGameState[6]) || (currentGameState[4] == player && player == currentGameState[5]))) {
        currentGameState[3] = computer
        document.querySelector('td[cell-index="3"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[4] == '' && ((currentGameState[3] == player && player == currentGameState[5]) || (currentGameState[1] == player && player == currentGameState[7]) || (currentGameState[0] == player && player == currentGameState[8]) || (currentGameState[2] == player && player == currentGameState[6]))) {
        currentGameState[4] = computer
        document.querySelector('td[cell-index="4"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[5] == '' && ((currentGameState[3] == player && player == currentGameState[4]) || (currentGameState[2] == player && player == currentGameState[8]))) {
        currentGameState[5] = computer
        document.querySelector('td[cell-index="5"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[6] == '' && ((currentGameState[1] == player && player == currentGameState[3]) || (currentGameState[7] == player && player == currentGameState[8]) || (currentGameState[2] == player && player == currentGameState[4]))) {
        currentGameState[6] = computer
        document.querySelector('td[cell-index="6"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[7] == '' && ((currentGameState[1] == player && player == currentGameState[4]) || (currentGameState[6] == player && player == currentGameState[8]))) {
        currentGameState[7] = computer
        document.querySelector('td[cell-index="7"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[8] == '' && ((currentGameState[0] == player && player == currentGameState[4]) || (currentGameState[7] == player && player == currentGameState[6]) || (currentGameState[2] == player && player == currentGameState[5]))) {
        currentGameState[8] = computer
        document.querySelector('td[cell-index="8"]').innerHTML = computer
        resultValidation()
        return
    }

    //Use Center Position is available
    if(currentGameState[4] == '') {
        currentGameState[4] = computer
        document.querySelector('td[cell-index="4"]').innerHTML = computer
        resultValidation()
        return
    }

    //Opposite Corner Case
    if(currentGameState[0] == '' && currentGameState[2] == player && currentGameState[6] == player) {
        currentGameState[0] = computer
        document.querySelector('td[cell-index="0"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[2] == '' && currentGameState[0] == player && currentGameState[8] == player) {
        currentGameState[2] = computer
        document.querySelector('td[cell-index="2"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[8] == '' && currentGameState[2] == player && currentGameState[6] == player) {
        currentGameState[8] = computer
        document.querySelector('td[cell-index="8"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[6] == '' && currentGameState[8] == player && currentGameState[0] == player) {
        currentGameState[6] = computer
        document.querySelector('td[cell-index="6"]').innerHTML = computer
        resultValidation()
        return
    }

    //Empty Corner Case
    if(currentGameState[0] == '') {
        currentGameState[0] = computer
        document.querySelector('td[cell-index="0"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[2] == '') {
        currentGameState[2] = computer
        document.querySelector('td[cell-index="2"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[8] == '') {
        currentGameState[8] = computer
        document.querySelector('td[cell-index="8"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[6] == '') {
        currentGameState[6] = computer
        document.querySelector('td[cell-index="6"]').innerHTML = computer
        resultValidation()
        return
    }

    //Empty Side
    if(currentGameState[1] == '') {
        currentGameState[1] = computer
        document.querySelector('td[cell-index="1"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[5] == '') {
        currentGameState[5] = computer
        document.querySelector('td[cell-index="5"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[7] == '') {
        currentGameState[7] = computer
        document.querySelector('td[cell-index="7"]').innerHTML = computer
        resultValidation()
        return
    }
    if(currentGameState[3] == '') {
        currentGameState[3] = computer
        document.querySelector('td[cell-index="3"]').innerHTML = computer
        resultValidation()
        return
    }

}

function restart() {
    document.querySelector('#final-screen').style.visibility = 'hidden'
    document.querySelector('#choice').style.visibility = 'visible'
    clearBoard()
}

document.querySelectorAll('#cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#new-game').addEventListener('click', restart)