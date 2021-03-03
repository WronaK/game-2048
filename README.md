# Game 2048

## Description of the game
The goal of the game is to move and combine the blocks appearing on the board in such a way as to create a block with the number 2048. 2048 is played on a board divided into 4 × 4 grids. Blocks with numbers appear on the board and move in the direction indicated by the player. They keep moving until they hit the end of the board or some other obstacle. After each move, one block with a value of 2 or 4 appears on a free space. If two blocks of the same value join during the move, they form one block with the value of their sum. A summed block can no longer connect to others in the same move.

The player wins the game when he creates a brick with a value of 2048. After collecting it, the player can continue the game to score more points. The game ends when there are no empty spaces on the board and there are no blocks that could connect into one in the next move
 

 ## Control
 The tiles are controlled using arrows on the keyboard.

 ## Instruction to run
 <ol>
    <li>Clone this repo</li>
    <li>Run `npm install`</li>
    <li>Run `npm run serve`, **localhost:8080/public/** will open up in your default browser</li>
 </ol>

 ## The appearance of the game
![](./image/game-2048.gif)