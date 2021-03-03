import { Position } from './position'
import {TypeTile} from "./enum"
export class Tile {
    private _value: number;
    private _previousItem: Position[];
    private _typeTile: TypeTile;

    public constructor(previousItem: Position = new Position(), value: number = 0, typeTile: TypeTile = TypeTile.EMPTY) {
        this._value = value;
        this._previousItem = [];
        this._previousItem[0] = previousItem;
        this._typeTile = typeTile;
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
    }

    public updatePosition(position: Position) {
        this._previousItem[0] = position;
    }

    public addPosition(position: Position) {
        this._previousItem[1] = position;
    }

    public removeAddPosition() {
        this._previousItem.length = 1;
    }

    public getPositions(): Position[] {
        return this._previousItem;
    }

    public checkPosition(position: number[]): boolean {
        const pos = this._previousItem[0].position();
        const x = pos[0];
        const y = pos[1];
        return x !== position[0] || y !== position[1];
    }
    public get typeTile() {
        return this._typeTile;
    }

    public set typeTile(typeTile: TypeTile) {
        this._typeTile = typeTile
    }
}