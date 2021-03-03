import { Tile } from './tile'
import {TypeTile, Direction} from "./enum"

export class GameView {
    private _score: HTMLElement | null;
    private _buttonNewGame: HTMLElement | null;
    private _buttonTryAgain: HTMLElement | null;
    private _buttonContinue: HTMLElement | null;
    private _board: HTMLElement | null;
    private _fieldButtons: HTMLElement | null;
    private _finalMessage: HTMLElement | null;

    public constructor() {
        this._score = document.querySelector<HTMLElement>("#score");
        this._buttonNewGame = document.querySelector<HTMLElement>("#new-game");
        this._buttonTryAgain = document.querySelector<HTMLElement>("#try-again");
        this._buttonContinue = document.querySelector<HTMLElement>("#continue");
        this._board = document.querySelector<HTMLElement>(".grid");
        this._fieldButtons = document.querySelector<HTMLElement>(".container-messages");
        this._finalMessage = document.querySelector<HTMLElement>("#final-message");
    }

    public displayGameOverMessage(): void {
        if(this._fieldButtons !== null && this._finalMessage !== null) {
                this._fieldButtons.style.display = "inherit";
                this._finalMessage.innerHTML = "PRZEGRAŁEŚ!";
            }
    }

    public displayWinMessage(): void {
        if(this._fieldButtons !== null && this._buttonContinue !== null && this._finalMessage !== null) {
            this._fieldButtons.style.display = "inherit";
            this._buttonContinue.style.display = "inherit";
            this._finalMessage.innerHTML = "WYGRAŁEŚ!";
        }
    }

    public hiddenMessage(): void {
        if(this._fieldButtons !== null && this._buttonContinue !== null) {
            this._fieldButtons.style.display = "none";
            this._buttonContinue.style.display = "none";
        }
    }

    public displayScore(score: number): void {
        if(this._score !== null) {
            this._score.textContent = String(score);
        }
    }

    public createBoard(board: Tile[][]): void {
        if(this._board !== null) {
            this._board.innerHTML = '';
            for(let i = 0; i < board.length; i++) {
                for(let j = 0; j < board.length; j++) {
                    const plate = document.createElement('div');
                    plate.id = "tile" + i + j;
                    if(board[i][j].value > 2048) {
                        plate.textContent = String(board[i][j].value);
                        plate.className = "tile-more";
                    } else if(board[i][j].value > 0 && board[i][j].value <= 2048) {
                        plate.textContent = String(board[i][j].value);
                        plate.className = "tile-" + board[i][j].value;
                    } else {
                        plate.className = "tile";
                    }
                        this._board.appendChild(plate);
                    }
            }
        }
    }

    public displayBoard(board: Tile[][]): void {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board.length; j++) {
                const plate = document.getElementById("tile" + i + j);
                if(plate !== null) {
                    if(board[i][j].value > 0) {
                        plate.textContent= String(board[i][j].value);
                        plate.className = "tile-" + board[i][j].value;
                        if(board[i][j].value > 2048) {
                            plate.className = "tile-more";
                        }
                        if(board[i][j].typeTile === TypeTile.NEW) {
                            plate.classList.add('appear');
                            board[i][j].typeTile = TypeTile.ORDINARY;
                        }
                        if(board[i][j].typeTile === TypeTile.CONNECTED) {
                            plate.classList.add('pop');
                            board[i][j].typeTile = TypeTile.ORDINARY;
                        }

                    } else {
                        plate.textContent = String("");
                        plate.className ="tile";
                    }
                }
            }
        }
    }

    public displayAnimationBoard(board: Tile[][], moveDirection: Direction): void {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board.length; j++) {
                this.addAnimation(moveDirection, i, j, board[i][j].getPositions()[0].position());

                if(board[i][j].typeTile === TypeTile.CONNECTED) {
                this.addAnimation(moveDirection, i, j, board[i][j].getPositions()[1].position())
                board[i][j].removeAddPosition();
                }
            }
        }
    }

    private addAnimation(moveDirection: Direction, i: number, j: number, position: number[]) {
        const plate = document.getElementById("tile" + position[0] + position[1]);
        if(plate !== null && plate.textContent !== "") {
            let x = Math.abs(j - position[1]);
            let y = Math.abs(i - position[0]);

            let amountShift;
            y >= x ? amountShift = y : amountShift = x;
            if(amountShift > 0 && amountShift < 4)
            switch(moveDirection) {
                case Direction.RIGHT:
                    plate.classList.add('move-right-' + amountShift);
                    break;
                case Direction.LEFT:
                    plate.classList.add('move-left-' + amountShift);
                    break;
                case Direction.UP:
                    plate.classList.add('move-up-' + amountShift);
                    break;
                case Direction.DOWN:
                    plate.classList.add('move-down-' + amountShift);
                    break;
            }
        }
    }

    public get buttonNewGame() {
        return this._buttonNewGame;
    }

    public get buttonTryAgain() {
        return this._buttonTryAgain;
    }

    public get buttonContinue() {
        return this._buttonContinue;
    }

}