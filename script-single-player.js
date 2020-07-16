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

function Selector(index) {
    currentGameState[index] = computer
    document.querySelector(`td[cell-index="${index}"]`).innerHTML = computer
    resultValidation()
}

function isCellFree(index) {
    return currentGameState[index] == ''
}

function checkComputerCells(index1, index2) {
    if(currentGameState[index1] == computer && currentGameState[index2] == computer) {
        return true
    }
    return false
}

function checkPlayerCells(index1, index2) {
    if(currentGameState[index1] == player && currentGameState[index2] == player) {
        return true
    }
    return false
}

function computerPlay() {
    //If there is a chance to Win

    if( isCellFree(0) && (checkComputerCells(1,2) || checkComputerCells(4,8) || checkComputerCells(3,6)) ) {
        Selector(0)
    }
    else if( isCellFree(1) && (checkComputerCells(0,2) || checkComputerCells(4,7)) ) {
        Selector(1)
    }
    else if( isCellFree(2) && (checkComputerCells(0,1) || checkComputerCells(5,8) || checkComputerCells(4,6)) ) {
        Selector(2)
    }
    else if( isCellFree(3) && (checkComputerCells(0,6) || checkComputerCells(4,5)) ) {
        Selector(3)
    }
    else if( isCellFree(4) && (checkComputerCells(3,5) || checkComputerCells(1,7) || checkComputerCells(0,8) || checkComputerCells(2,6)) ) {
        Selector(4)
    }
    else if( isCellFree(5) && (checkComputerCells(3,4) || checkComputerCells(2,8)) ) {
        Selector(5)
    }
    else if( isCellFree(6) && (checkComputerCells(1,3) || checkComputerCells(7,8) || checkComputerCells(2,4)) ) {
        Selector(6)
    }
    else if( isCellFree(7) && (checkComputerCells(1,4) || checkComputerCells(6,8)) ) {
        Selector(7)
    }
    else if( isCellFree(8) && (checkComputerCells(0,4) || checkComputerCells(7,6) || checkComputerCells(2,5)) ) {
        Selector(8)
    }

    //If there is a chance to block.
    else if( isCellFree(0) && (checkPlayerCells(1,2) || checkPlayerCells(4,8) || checkPlayerCells(3,6)) ) {
        Selector(0)
    }
    else if( isCellFree(1) && (checkPlayerCells(0,2) || checkPlayerCells(4,7)) ) {
        Selector(1)
    }
    else if( isCellFree(2) && (checkPlayerCells(0,1) || checkPlayerCells(5,8) || checkPlayerCells(4,6)) ) {
        Selector(2)
    }
    else if( isCellFree(3) && (checkPlayerCells(0,6) || checkPlayerCells(4,5)) ) {
        Selector(3)
    }
    else if( isCellFree(4) && (checkPlayerCells(3,5) || checkPlayerCells(1,7) || checkPlayerCells(0,8) || checkPlayerCells(2,6)) ) {
        Selector(4)
    }
    else if( isCellFree(5) && (checkPlayerCells(3,4) || checkPlayerCells(2,8)) ) {
        Selector(5)
    }
    else if( isCellFree(6) && (checkPlayerCells(1,3) || checkPlayerCells(7,8) || checkPlayerCells(2,4)) ) {
        Selector(6)
    }
    else if( isCellFree(7) && (checkPlayerCells(1,4) || checkPlayerCells(6,8)) ) {
        Selector(7)
    }
    else if( isCellFree(8) && (checkPlayerCells(0,4) || checkPlayerCells(7,6) || checkPlayerCells(2,5)) ) {
        Selector(8)
    }

    //Use Center Position is available
    else if(isCellFree(4)) {
        Selector(4)
    }

    //Opposite Corner Case
    else if(isCellFree(0) && checkPlayerCells(2,6)) {
        Selector(0)
    }
    else if(isCellFree(2) && checkPlayerCells(0,8)) {
        Selector(2)
    }
    else if(isCellFree(8) && checkPlayerCells(2,6)) {
        Selector(8)
    }
    else if(isCellFree(6) && checkPlayerCells(0,8)) {
        Selector(6)
    }

    //Empty Corner Case
    else if(isCellFree(0)) {
        Selector(0)
    }
    else if(isCellFree(2)) {
        Selector(2)
    }
    else if(isCellFree(8)) {
        Selector(8)
    }
    else if(isCellFree(6)) {
        Selector(6)
    }

    //Empty Side
    else if(isCellFree(1)) {
        Selector(1)
    }
    else if(isCellFree(5)) {
        Selector(5)
    }
    else if(isCellFree(7)) {
        Selector(7)
    }
    else if(isCellFree(3)) {
        Selector(3)
    }

}

function restart() {
    document.querySelector('#final-screen').style.visibility = 'hidden'
    document.querySelector('#choice').style.visibility = 'visible'
    clearBoard()
}

document.querySelectorAll('#cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#new-game').addEventListener('click', restart)