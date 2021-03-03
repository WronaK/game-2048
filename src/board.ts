import { Tile } from "./tile"
import {Position} from "./position"
import {TypeTile} from "./enum"

export class Board {
    public _board: Tile[][];
    private _pointCurrentMove: number;

    public constructor(size: number) {
        this._board = [];
        this._pointCurrentMove = 0;
        this.initialBoard(size);
    } 

    private initialBoard(size: number): void {
        for(let i = 0; i < size; i++) {
            this._board[i] = [];
            for(let j = 0; j < size; j++) {
                this._board[i][j] = new Tile(new Position(i, j));
            }
        }
        this.addTile();
        this.addTile();
    }

    public addTile(): void {
        let blankTiles = this.createBlankTile();
        
        
        if(blankTiles.length > 0) {
            let index = Math.floor(Math.random()*blankTiles.length);
            let element = blankTiles[index];
            const value = Math.floor(Math.random() * 2);
            this._board[element.x][element.y].value = value === 0 ? 2:4; 
            this._board[element.x][element.y].typeTile = TypeTile.NEW;
        }
    }

    private createBlankTile() {
        let blankTiles = [];
        for(let i = 0; i < this._board.length; i++) {
            for(let j = 0; j < this._board.length; j++) {
                if(this._board[i][j].typeTile === TypeTile.EMPTY) {
                    blankTiles.push({x:i, y:j});
                }
            }
        }
        return blankTiles;
    }

    private flipBoard(): void {
        for(let i = 0; i < this._board.length; i++) {
            this._board[i].reverse();
        }
    }

    private removeEmptyTiles(row: Tile[]) {
        let j = 0;
        for(let i = 0; i < row.length; i++) {
            if(row[i].value > 0) {
                const temp = row[j];
                row[j] = row[i];
                row[i] = temp;
                j++;
            }
        }
    }

    private connectTiles(row: Tile[]): void { 
        for(let i = 0; i < row.length - 1; i++) {
            if(row[i].value === row[i+1].value && row[i].typeTile !== TypeTile.EMPTY 
                && row[i].typeTile !== TypeTile.CONNECTED && row[i+1].typeTile !== TypeTile.CONNECTED) {
                this._pointCurrentMove += 2 * row[1].value;
                row[i].value = 2 * row[i].value;
                row[i].addPosition(row[i+1].getPositions()[0]);
                row[i].typeTile = TypeTile.CONNECTED;
                row[i+1].value = 0;
                row[i+1].updatePosition(new Position());
                row[i+1].typeTile= TypeTile.EMPTY;
                
            }
        } 
    }

    private executeMove(row: Tile[]) {
        this.removeEmptyTiles(row);
        this.connectTiles(row);
        this.removeEmptyTiles(row);
    }

    public checkIsPossibleMove (): boolean {
        for(let i = 0; i < this._board.length; i++) {
            for(let j = 0; j < this._board[i].length-1; j++) {
                if(this._board[i][j].value === this._board[i][j+1].value) {
                    return true;
                }
            }
        }

        for(let i = 0; i < this._board.length-1; i++) {
            for(let j = 0; j < this._board[i].length; j++) {
                if(this._board[j][i].value === this._board[j][i+1].value) {
                    return true;
                }
            }
        }
        return false;
    }

    public moveLeft(): void {
        this._pointCurrentMove = 0;
        for(let i = 0; i < this._board.length; i++) {
            this.executeMove(this._board[i]);
        }
 
    }

    public moveRight(): void {
        this._pointCurrentMove = 0;
        this.flipBoard();
        for(let i = 0; i < this._board.length; i++) {
            this.executeMove(this._board[i]);
        }
        this.flipBoard();
    }

    public moveUp(): void {
        this._pointCurrentMove = 0;
        this.rotateBoard();
        for(let i = 0; i < this._board.length; i++) {
            this.executeMove(this._board[i]);
        }
        this.rotateBoard();
    }

    public moveDown(): void {
        this._pointCurrentMove = 0;
        this.rotateBoard();
        this.flipBoard();
        for(let i = 0; i < this._board.length; i++) {
            this.executeMove(this._board[i]);
        }
        this.flipBoard();
        this.rotateBoard();
    
    }

    private rotateBoard(): void {
        for(let i = 0; i < this._board.length; i++) {
            for(let j = i + 1; j < this._board[i].length; j++) {
                let temp = this._board[i][j];
                this._board[i][j] = this._board[j][i];
                this._board[j][i] = temp;
            }
        }
    }

    
   public isFully(): boolean {
    for(let i = 0; i < this._board.length; i++) {
        for(let j = 0; j < this._board.length; j++) {
            if(this._board[i][j].typeTile === TypeTile.EMPTY) {
                return false;
            }
        }
    }
    return true;
   }

   public isTile2048(): boolean {
    for(let i = 0; i < this._board.length; i++) {
        for(let j = 0; j < this._board.length; j++) {
            if(this._board[i][j].value === 2048) {
                return true;
            }
        }
    }
    return false;
   }

   public isCorrectMove(): boolean {
        for(let i = 0; i < this._board.length; i++) {
            for(let j = 0; j < this._board.length; j++) {
                if(this._board[i][j].typeTile !== TypeTile.EMPTY) {
                    if(this._board[i][j].typeTile == TypeTile.CONNECTED || this._board[i][j].checkPosition([i, j])) {
                        return true;
                    }
                }
            }
        }

        return false;
   }

   public updatePosition() {
       for(let i = 0; i < this._board.length; i++) {
           for(let j = 0; j < this._board.length; j++) {
               this._board[i][j].updatePosition(new Position(i, j));
               if(this._board[i][j].typeTile !== TypeTile.EMPTY && this._board[i][j].typeTile !== TypeTile.CONNECTED) {
                   this._board[i][j].typeTile = TypeTile.ORDINARY;
               }
           }
       }
   }

   public get pointCurrentMove() {
       return this._pointCurrentMove;
   }
}