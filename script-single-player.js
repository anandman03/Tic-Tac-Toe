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

    const possibleCells = [
        [1, 2, 4, 8, 3, 6],
        [0, 2, 4, 7],
        [0, 1, 5, 8, 4, 6],
        [0, 6, 4, 5],
        [3, 5, 1, 7, 0, 8, 2, 6],
        [3, 4, 2, 8],
        [1, 3, 7, 8, 2, 4],
        [1, 4, 6, 8],
        [0, 4, 7, 6, 2, 5]
    ]

    //If winning move is possible.
    for(let i = 0 ; i < size ; i++) {
        if(!isCellFree(i)) {
            continue
        }
        for(let j = 0 ; j < possibleCells[i].length ; j++) {
            let cell1 = possibleCells[i][j]
            let cell2 = possibleCells[i][j+1]
            if(checkComputerCells(cell1, cell2)) {
                Selector(i)
                return
            }
        }
    }

    //For blocking the player Move.
    for(let i = 0 ; i < size ; i++) {
        if(!isCellFree(i)) {
            continue
        }
        for(let j = 0 ; j < possibleCells[i].length ; j++) {
            let cell1 = possibleCells[i][j]
            let cell2 = possibleCells[i][j+1]
            if(checkPlayerCells(cell1, cell2)) {
                Selector(i)
                return
            }
        }
    }

    //Use Center Position is available
    if(isCellFree(4)) {
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