export class Position {
    private _x: number;
    private _y: number;

    public constructor(x: number = -1, y:number = -1) {
        this._x = x;
        this._y = y;
    }

    public position() {
        return [this._x, this._y];
    }

    public setPosition(x: number, y:number) {
        this._x = x;
        this._y = y;
    }
}