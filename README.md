A Tic-Tac-Toe game made using pure html, javascript and basic css styling.
This Tic-Tac-Toe game has two modes :-
1. Single Player
2. Multi Player

The main feature of single player mode is the computer as the opponent which is really hard to beat.
The computer will be really hard to beat as it will always perform the winning/optimal move which in worst case would end up as tie.

How the whole algorithm work?
1. User fill the desired cell if it is user's turn.
2. The selected cell is checked wheather it is empty or not.
3. If empty then the cell is filled and checked if any result is concluded.
4. After the move and validation the turn is changed to other user/computer.
5. Repeating the above steps until we get some result.

Moves which computer would make (Priority-wise) :
1. Check if computer is able to win.
2. Check if computer is able to block user.
3. Choose center position is available.
4. Try to join opposite corners.
5. Fill an empty corner (if available).
6. Fill an empty size (if available).