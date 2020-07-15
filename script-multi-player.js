console.log('Your JS is linked up. Be the person you needed when you were little.')

let currentPlayer = ''
let gameStatus = true
const size = 9

let currentGameState = ['', '', '', '', '', '', '', '', '']

const turnMessage = () => `${currentPlayer}'s Turn`
const winMessage = () => `${currentPlayer} Wins !`
const drawMessage = () => `The Game ended in a Draw !`

function printStatus() {
    const status = document.querySelector('#status')
    status.style.visibility = 'visible'
    status.innerHTML = turnMessage()
}

function clearBoard() {
    document.querySelectorAll('#cell').forEach(cell => cell.innerHTML = '')
    for(let i = 0 ; i < size ; i++) {
        currentGameState[i] = ''
    }
    currentPlayer = ''
    gameStatus = true
}

function userInput(choice) {
    currentPlayer = choice
    const choiceSection = document.querySelector('#choice')
    const boardSection = document.querySelector('#board')
    
    choiceSection.style.visibility = 'hidden'
    boardSection.style.visibility = 'visible'

    printStatus()
}

function changeUser() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
    printStatus()
}

function playMove(clickedCell, clickedCellIndex) {
    currentGameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer
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
    changeUser()
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'))

    if(currentGameState[clickedCellIndex] != '' || !gameStatus) {
        return
    }
    playMove(clickedCell, clickedCellIndex)
    resultValidation()
}

function restart() {
    document.querySelector('#final-screen').style.visibility = 'hidden'
    document.querySelector('#choice').style.visibility = 'visible'
    document.querySelector('#status').style.visibility = 'hidden'
    clearBoard()
}

document.querySelectorAll('#cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#new-game').addEventListener('click', restart)