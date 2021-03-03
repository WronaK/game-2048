import { Board } from "./board"
import {GameView} from './game-view'
import {KeyCode, Direction} from "./enum"

export class Game {
    private _gameView: GameView;
    private _board: Board;
    private _score: number;
    private _activeMove = false;
    private _continueGame = false;


    public constructor(size: number) {
        this._score = 0;
        this._gameView = new GameView();
        this._board = new Board(size);
        this._gameView.hiddenMessage();
        this.init();
    }
    
    private init(): void {
        document.addEventListener("keydown", this.executionMove.bind(this), false); 
        this._gameView.buttonNewGame?.addEventListener("click", this.newGame.bind(this));
        this._gameView.buttonContinue?.addEventListener("click", this.continueGame.bind(this));
        this._gameView.buttonTryAgain?.addEventListener("click", this.newGame.bind(this));
        this._gameView.createBoard(this._board._board);
        this._gameView.displayBoard(this._board._board);
        this._gameView.displayScore(this._score);
    }

    private newGame() {
        this._score = 0;
        this._activeMove = false;
        this._board = new Board(4);
        this._gameView.hiddenMessage();  
        this._gameView.displayBoard(this._board._board);
        this._gameView.displayScore(this._score); 
        this._continueGame = false;
    }

    private continueGame() {
        this._gameView.hiddenMessage();
        this._activeMove = false;
        this._continueGame = true;
    }
    
    private executionMove(event: KeyboardEvent):void {
        if(this._activeMove)
            return;
        this._activeMove = true;

        let moveDirection = null;
        if(!this.isWon() && !this.isGameOver()){
            switch(event.code) {
                case KeyCode.RIGHT:
                    this._board.moveRight();
                    moveDirection = Direction.RIGHT;
                    break;
                case KeyCode.LEFT:
                    this._board.moveLeft();
                    moveDirection = Direction.LEFT;
                    break;
                case KeyCode.UP:
                    this._board.moveUp();
                    moveDirection = Direction.UP;
                    break;
                case KeyCode.DOWN:
                    this._board.moveDown();
                    moveDirection = Direction.DOWN;
                    break;
            }

            if(this._board.isCorrectMove() && moveDirection !== null){
                this._score += this._board.pointCurrentMove;
                this._gameView.displayAnimationBoard(this._board._board, moveDirection);
                setTimeout(() => {
                    this._board.updatePosition();
                    this._gameView.displayScore(this._score);
                    this._board.addTile();
                    this._gameView.displayBoard(this._board._board); 
                    setTimeout(() => this._activeMove = false, 800);                   
                }, 600);
            } else {
                this._activeMove = false;
            }
        }
    }

    public set score(score: number) {
        this._score = score;
    }

    public get score() {
        return this._score;
    }  

    private isWon(): boolean { 
        if(!this._continueGame && this._board.isTile2048()) {
            this._gameView.displayWinMessage();
            return true;
        }
        return false;
    }

    private isGameOver(): boolean {
        if(this._board.isFully()) {
            if(!this._board.checkIsPossibleMove()) {
                this._gameView.displayGameOverMessage();
                return true;
            }
        }
        return false;  
    }
}






