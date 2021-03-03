import { Board } from "../src/board";
import { Tile } from "../src/tile";
import { Position } from '../src/position'
import {TypeTile} from "../src/enum"


describe("testing one plate shift", () => {
    let board: Board;
    let input: Tile[][];

    beforeEach(() => {
        board = new Board(4);
        input = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
                    new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                [new Tile(new Position(1, 0)), new Tile(new Position(1, 1), 2, TypeTile.ORDINARY),
                    new Tile(new Position(1,2)), new Tile(new Position(1,3))],
                [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                    new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
                    new Tile(new Position(3,2)), new Tile(new Position(3,3))]];
        board._board = input;
    })

    test("move the tile to the left", () => {
        const output = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
                            new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                        [new Tile(new Position(1, 1), 2, TypeTile.ORDINARY), new Tile(new Position(1, 0)),
                            new Tile(new Position(1,2)), new Tile(new Position(1,3))],
                        [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                            new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                        [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
                            new Tile(new Position(3,2)), new Tile(new Position(3,3))]];

        board.moveLeft();
        expect(board._board).toEqual(output);
    })

    test("move the tile to the right", () => {
        const output = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
            new Tile(new Position(0,2)), new Tile(new Position(0,3))],
            [new Tile(new Position(1, 0)), new Tile(new Position(1,3)),
                new Tile(new Position(1,2)), new Tile(new Position(1, 1), 2, TypeTile.ORDINARY)],
            [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                new Tile(new Position(2,2)), new Tile(new Position(2,3))],
            [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
                new Tile(new Position(3,2)), new Tile(new Position(3,3))]];

        board.moveRight();
        expect(board._board).toEqual(output);
    })

    test("move the tile to the down", () => {
        const output = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
                            new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                        [new Tile(new Position(1, 0)), new Tile(new Position(3, 1)),
                            new Tile(new Position(1,2)), new Tile(new Position(1,3))],
                        [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                            new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                        [new Tile(new Position(3, 0)), new Tile(new Position(1, 1), 2, TypeTile.ORDINARY),
                            new Tile(new Position(3,2)), new Tile(new Position(3,3))]];

        board.moveDown();
        expect(board._board).toEqual(output);
    })

    test("move the tile to the up", () => {
        const output = [[new Tile(new Position(0, 0)), new Tile(new Position(1, 1), 2, TypeTile.ORDINARY),
            new Tile(new Position(0,2)), new Tile(new Position(0,3))],
        [new Tile(new Position(1, 0)), new Tile(new Position(0, 1)),
            new Tile(new Position(1,2)), new Tile(new Position(1,3))],
        [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
            new Tile(new Position(2,2)), new Tile(new Position(2,3))],
        [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
            new Tile(new Position(3,2)), new Tile(new Position(3,3))]];
    
        board.moveUp();
        expect(board._board).toEqual(output);
    })
})

describe("plate bonding test", () => {
    let board: Board;
    let input: Tile[][];

    beforeEach(() => {
        board = new Board(4);
        input = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
                    new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                [new Tile(new Position(1, 0)), new Tile(new Position(1, 1), 2, TypeTile.ORDINARY),
                    new Tile(new Position(1, 2), 2, TypeTile.ORDINARY), new Tile(new Position(1,3))],
                [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                    new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
                    new Tile(new Position(3,2)), new Tile(new Position(3,3))]];
        board._board = input;
    })

    test("connection and shift of tiles to the left", () => {
        const tile = new Tile(new Position(1, 1), 4, TypeTile.CONNECTED);
        tile.addPosition(new Position(1, 2));
        const output = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
                            new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                        [tile, new Tile(),
                            new Tile(new Position(1,0)), new Tile(new Position(1,3))],
                        [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                            new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                        [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
                            new Tile(new Position(3,2)), new Tile(new Position(3,3))]];

        board.moveLeft();
        expect(board._board).toEqual(output);
    })

    test("connection and shift of tiles to the right", () => {
        const tile = new Tile(new Position(1, 2), 4, TypeTile.CONNECTED);
        tile.addPosition(new Position(1, 1));
        const output = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
                            new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                            [new Tile(new Position(1, 0)), new Tile(new Position(1,3)),
                                new Tile(), tile],
                            [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                                new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                            [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
                                new Tile(new Position(3,2)), new Tile(new Position(3,3))]];

        board.moveRight();
        expect(board._board).toEqual(output);
    })
})

describe("plate bonding test", () => {
    let board: Board;
    let input: Tile[][];

    beforeEach(() => {
        board = new Board(4);
        input = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1), 2, TypeTile.ORDINARY),
                    new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                [new Tile(new Position(1, 0)), new Tile(new Position(1, 1), 2, TypeTile.ORDINARY),
                    new Tile(new Position(1,2)), new Tile(new Position(1,3))],
                [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                    new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
                    new Tile(new Position(3,2)), new Tile(new Position(3,3))]];
        board._board = input;
    })

    test("connection and shift of tiles to the down", () => {
        const tile = new Tile(new Position(1, 1), 4, TypeTile.CONNECTED);
        tile.addPosition(new Position(0, 1));
        const output = [[new Tile(new Position(0, 0)), new Tile(new Position(2, 1)),
                            new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                        [new Tile(new Position(1, 0)), new Tile(new Position(3, 1)),
                            new Tile(new Position(1,2)), new Tile(new Position(1,3))],
                        [new Tile(new Position(2, 0)), new Tile(),
                            new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                        [new Tile(new Position(3, 0)), tile,
                            new Tile(new Position(3,2)), new Tile(new Position(3,3))]];

        board.moveDown();
        expect(board._board).toEqual(output);
    })

    test("connection and shift of tiles to the up", () => {
        const tile = new Tile(new Position(0, 1), 4, TypeTile.CONNECTED);
        tile.addPosition(new Position(1, 1));

        const output = [[new Tile(new Position(0, 0)), tile,
                            new Tile(new Position(0,2)), new Tile(new Position(0,3))],
                        [new Tile(new Position(1, 0)), new Tile(),
                            new Tile(new Position(1,2)), new Tile(new Position(1,3))],
                        [new Tile(new Position(2, 0)), new Tile(new Position(2, 1)),
                            new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                        [new Tile(new Position(3, 0)), new Tile(new Position(3, 1)),
                            new Tile(new Position(3,2)), new Tile(new Position(3,3))]];

        board.moveUp();
        expect(board._board).toEqual(output);
    })
})

describe("connection and shift of several tiles", () => {
    let board: Board;
    let input: Tile[][];

    beforeEach(() => {
        board = new Board(4);
        input = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
                    new Tile(new Position(0,2)), new Tile(new Position(0,3), 2, TypeTile.ORDINARY)],
                [new Tile(new Position(1, 0)), new Tile(new Position(1, 1), 2, TypeTile.ORDINARY),
                    new Tile(new Position(1,2), 2, TypeTile.ORDINARY), new Tile(new Position(1,3))],
                [new Tile(new Position(2, 0)), new Tile(new Position(2, 1), 2, TypeTile.ORDINARY),
                    new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                [new Tile(new Position(3, 0), 2, TypeTile.ORDINARY), new Tile(new Position(3, 1)),
                    new Tile(new Position(3,2), 2, TypeTile.ORDINARY), new Tile(new Position(3,3))]];
        board._board = input;
    })

    test("move left", ()=> {
        const tile01 = new Tile(new Position(1,1), 4, TypeTile.CONNECTED);
        tile01.addPosition(new Position(1,2));
        const tile03 = new Tile(new Position(3, 0), 4, TypeTile.CONNECTED);
        tile03.addPosition(new Position(3,2));

        const output = [[new Tile(new Position(0,3), 2, TypeTile.ORDINARY), new Tile(new Position(0, 1)),
                            new Tile(new Position(0,2)), new Tile(new Position(0, 0))],
                        [tile01, new Tile(), new Tile(new Position(1, 0)), new Tile(new Position(1,3))],
                        [new Tile(new Position(2, 1), 2, TypeTile.ORDINARY), new Tile(new Position(2, 0)),
                            new Tile(new Position(2,2)), new Tile(new Position(2,3))],
                        [tile03, new Tile(), new Tile(new Position(3, 1)), new Tile(new Position(3,3))]];

        board.moveLeft();
        expect(board._board).toEqual(output);
    })

    test("move right", ()=> {
        const tile13 = new Tile(new Position(1,2), 4, TypeTile.CONNECTED);
        tile13.addPosition(new Position(1,1));
        const tile33 = new Tile(new Position(3, 2), 4, TypeTile.CONNECTED);
        tile33.addPosition(new Position(3,0));

        const output = [[new Tile(new Position(0, 0)), new Tile(new Position(0, 1)),
            new Tile(new Position(0,2)), new Tile(new Position(0,3), 2, TypeTile.ORDINARY)],
                        [new Tile(new Position(1, 0)), new Tile(new Position(1, 3)),
                            new Tile(), tile13],
                        [new Tile(new Position(2, 0)), new Tile(new Position(2,3)),
                            new Tile(new Position(2,2)), new Tile(new Position(2, 1), 2, TypeTile.ORDINARY)],
                        [new Tile(new Position(3,3)), new Tile(new Position(3, 1)), new Tile(), tile33]];

        board.moveRight();
        expect(board._board).toEqual(output);
    })

    test("move up", ()=> {
        const tile02 = new Tile(new Position(1,2), 4, TypeTile.CONNECTED);
        tile02.addPosition(new Position(3,2));
        const tile01 = new Tile(new Position(1, 1), 4, TypeTile.CONNECTED);
        tile01.addPosition(new Position(2,1));

        const output = [[new Tile(new Position(3, 0), 2, TypeTile.ORDINARY), tile01,
                        tile02, new Tile(new Position(0,3), 2, TypeTile.ORDINARY)],
                        [new Tile(new Position(1, 0)), new Tile(),
                            new Tile(), new Tile(new Position(1, 3))],
                        [new Tile(new Position(2, 0)), new Tile(new Position(0,1)),
                            new Tile(new Position(2,2)), new Tile(new Position(2, 3))],
                        [new Tile(new Position(0,0)), new Tile(new Position(3, 1)), 
                            new Tile(new Position(0, 2)), new Tile(new Position(3, 3))]];

        board.moveUp();
        expect(board._board).toEqual(output);
    })

    test("move down", ()=> {
        const tile32 = new Tile(new Position(3,2), 4, TypeTile.CONNECTED);
        tile32.addPosition(new Position(1,2));
        const tile31 = new Tile(new Position(2, 1), 4, TypeTile.CONNECTED);
        tile31.addPosition(new Position(1,1));

        const output = [[new Tile(new Position(0,0)), new Tile(new Position(0, 1)), 
            new Tile(new Position(0, 2)), new Tile(new Position(3, 3))],
                        [new Tile(new Position(1, 0)), new Tile(new Position(3, 1)),
                            new Tile(new Position(2,2)), new Tile(new Position(1, 3))],
                        [new Tile(new Position(2, 0)), new Tile(),
                            new Tile(), new Tile(new Position(2, 3))],
                        [new Tile(new Position(3, 0), 2, TypeTile.ORDINARY), tile31,
                            tile32, new Tile(new Position(0,3), 2, TypeTile.ORDINARY)]];

        board.moveDown();
        expect(board._board).toEqual(output);
    })
})

describe("'isFully' function test", () => {
    let board: Board;

    beforeEach(() => {
        board = new Board(4);
    })

    test("full board", () => {
        const tile = new Tile(new Position(1, 1), 4, TypeTile.ORDINARY);
        const input = [[tile, tile, tile, tile],
                [tile, tile, tile, tile],
                [tile, tile, tile, tile],
                [tile, tile, tile, tile]];

        board._board = input;

        expect(board.isFully()).toEqual(true);
    })

    test("incomplete board", () => {
        const tile = new Tile(new Position(1, 1), 4, TypeTile.ORDINARY);
        const input = [[tile, tile, tile, tile],
                [tile, tile, tile, tile],
                [tile, tile, tile, tile],
                [tile, tile, new Tile(new Position(3,2)), tile]];

        board._board = input;

        expect(board.isFully()).toEqual(false);
    })
})

describe("'isTile2048' function test", () => {
    let board: Board;

    beforeEach(() => {
        board = new Board(4);
    })

    test("tile 2048 with board", () => {
        const tile = new Tile(new Position(1, 1), 4, TypeTile.ORDINARY);
        const input = [[tile, tile, tile, tile],
                [tile, tile, tile, tile],
                [tile, tile, tile, tile],
                [tile, tile, tile, new Tile(new Position(3,3), 2048, TypeTile.ORDINARY)]];

        board._board = input;

        expect(board.isTile2048()).toEqual(true);
    })

    test("2048 tile missing", () => {
        const tile = new Tile(new Position(1, 1), 4, TypeTile.ORDINARY);
        const input = [[tile, tile, tile, tile],
                [tile, tile, tile, tile],
                [tile, tile, tile, tile],
                [tile, tile, tile, tile]];

        board._board = input;

        expect(board.isTile2048()).toEqual(false);
    })
})