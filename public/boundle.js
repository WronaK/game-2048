/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.ts":
/*!**********************!*\
  !*** ./src/board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Board\": () => /* binding */ Board\n/* harmony export */ });\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./src/tile.ts\");\n/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./position */ \"./src/position.ts\");\n/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enum */ \"./src/enum.ts\");\n\r\n\r\n\r\nclass Board {\r\n    constructor(size) {\r\n        this._board = [];\r\n        this._pointCurrentMove = 0;\r\n        this.initialBoard(size);\r\n    }\r\n    initialBoard(size) {\r\n        for (let i = 0; i < size; i++) {\r\n            this._board[i] = [];\r\n            for (let j = 0; j < size; j++) {\r\n                this._board[i][j] = new _tile__WEBPACK_IMPORTED_MODULE_0__.Tile(new _position__WEBPACK_IMPORTED_MODULE_1__.Position(i, j));\r\n            }\r\n        }\r\n        this.addTile();\r\n        this.addTile();\r\n    }\r\n    addTile() {\r\n        let blankTiles = this.createBlankTile();\r\n        if (blankTiles.length > 0) {\r\n            let index = Math.floor(Math.random() * blankTiles.length);\r\n            let element = blankTiles[index];\r\n            const value = Math.floor(Math.random() * 2);\r\n            this._board[element.x][element.y].value = value === 0 ? 2 : 4;\r\n            this._board[element.x][element.y].typeTile = _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.NEW;\r\n        }\r\n    }\r\n    createBlankTile() {\r\n        let blankTiles = [];\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            for (let j = 0; j < this._board.length; j++) {\r\n                if (this._board[i][j].typeTile === _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.EMPTY) {\r\n                    blankTiles.push({ x: i, y: j });\r\n                }\r\n            }\r\n        }\r\n        return blankTiles;\r\n    }\r\n    flipBoard() {\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            this._board[i].reverse();\r\n        }\r\n    }\r\n    removeEmptyTiles(row) {\r\n        let j = 0;\r\n        for (let i = 0; i < row.length; i++) {\r\n            if (row[i].value > 0) {\r\n                const temp = row[j];\r\n                row[j] = row[i];\r\n                row[i] = temp;\r\n                j++;\r\n            }\r\n        }\r\n    }\r\n    connectTiles(row) {\r\n        for (let i = 0; i < row.length - 1; i++) {\r\n            if (row[i].value === row[i + 1].value && row[i].typeTile !== _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.EMPTY\r\n                && row[i].typeTile !== _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.CONNECTED && row[i + 1].typeTile !== _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.CONNECTED) {\r\n                this._pointCurrentMove += 2 * row[1].value;\r\n                row[i].value = 2 * row[i].value;\r\n                row[i].addPosition(row[i + 1].getPositions()[0]);\r\n                row[i].typeTile = _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.CONNECTED;\r\n                row[i + 1].value = 0;\r\n                row[i + 1].updatePosition(new _position__WEBPACK_IMPORTED_MODULE_1__.Position());\r\n                row[i + 1].typeTile = _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.EMPTY;\r\n            }\r\n        }\r\n    }\r\n    executeMove(row) {\r\n        this.removeEmptyTiles(row);\r\n        this.connectTiles(row);\r\n        this.removeEmptyTiles(row);\r\n    }\r\n    checkIsPossibleMove() {\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            for (let j = 0; j < this._board[i].length - 1; j++) {\r\n                if (this._board[i][j].value === this._board[i][j + 1].value) {\r\n                    return true;\r\n                }\r\n            }\r\n        }\r\n        for (let i = 0; i < this._board.length - 1; i++) {\r\n            for (let j = 0; j < this._board[i].length; j++) {\r\n                if (this._board[j][i].value === this._board[j][i + 1].value) {\r\n                    return true;\r\n                }\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n    moveLeft() {\r\n        this._pointCurrentMove = 0;\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            this.executeMove(this._board[i]);\r\n        }\r\n    }\r\n    moveRight() {\r\n        this._pointCurrentMove = 0;\r\n        this.flipBoard();\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            this.executeMove(this._board[i]);\r\n        }\r\n        this.flipBoard();\r\n    }\r\n    moveUp() {\r\n        this._pointCurrentMove = 0;\r\n        this.rotateBoard();\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            this.executeMove(this._board[i]);\r\n        }\r\n        this.rotateBoard();\r\n    }\r\n    moveDown() {\r\n        this._pointCurrentMove = 0;\r\n        this.rotateBoard();\r\n        this.flipBoard();\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            this.executeMove(this._board[i]);\r\n        }\r\n        this.flipBoard();\r\n        this.rotateBoard();\r\n    }\r\n    rotateBoard() {\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            for (let j = i + 1; j < this._board[i].length; j++) {\r\n                let temp = this._board[i][j];\r\n                this._board[i][j] = this._board[j][i];\r\n                this._board[j][i] = temp;\r\n            }\r\n        }\r\n    }\r\n    isFully() {\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            for (let j = 0; j < this._board.length; j++) {\r\n                if (this._board[i][j].typeTile === _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.EMPTY) {\r\n                    return false;\r\n                }\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n    isTile2048() {\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            for (let j = 0; j < this._board.length; j++) {\r\n                if (this._board[i][j].value === 2048) {\r\n                    return true;\r\n                }\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n    isCorrectMove() {\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            for (let j = 0; j < this._board.length; j++) {\r\n                if (this._board[i][j].typeTile !== _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.EMPTY) {\r\n                    if (this._board[i][j].typeTile == _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.CONNECTED || this._board[i][j].checkPosition([i, j])) {\r\n                        return true;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n    updatePosition() {\r\n        for (let i = 0; i < this._board.length; i++) {\r\n            for (let j = 0; j < this._board.length; j++) {\r\n                this._board[i][j].updatePosition(new _position__WEBPACK_IMPORTED_MODULE_1__.Position(i, j));\r\n                if (this._board[i][j].typeTile !== _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.EMPTY && this._board[i][j].typeTile !== _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.CONNECTED) {\r\n                    this._board[i][j].typeTile = _enum__WEBPACK_IMPORTED_MODULE_2__.TypeTile.ORDINARY;\r\n                }\r\n            }\r\n        }\r\n    }\r\n    get pointCurrentMove() {\r\n        return this._pointCurrentMove;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://gra-2048/./src/board.ts?");

/***/ }),

/***/ "./src/enum.ts":
/*!*********************!*\
  !*** ./src/enum.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"KeyCode\": () => /* binding */ KeyCode,\n/* harmony export */   \"TypeTile\": () => /* binding */ TypeTile,\n/* harmony export */   \"Direction\": () => /* binding */ Direction\n/* harmony export */ });\nvar KeyCode;\r\n(function (KeyCode) {\r\n    KeyCode[\"LEFT\"] = \"ArrowLeft\";\r\n    KeyCode[\"UP\"] = \"ArrowUp\";\r\n    KeyCode[\"RIGHT\"] = \"ArrowRight\";\r\n    KeyCode[\"DOWN\"] = \"ArrowDown\";\r\n})(KeyCode || (KeyCode = {}));\r\nvar TypeTile;\r\n(function (TypeTile) {\r\n    TypeTile[TypeTile[\"EMPTY\"] = 0] = \"EMPTY\";\r\n    TypeTile[TypeTile[\"NEW\"] = 1] = \"NEW\";\r\n    TypeTile[TypeTile[\"ORDINARY\"] = 2] = \"ORDINARY\";\r\n    TypeTile[TypeTile[\"CONNECTED\"] = 3] = \"CONNECTED\";\r\n})(TypeTile || (TypeTile = {}));\r\nvar Direction;\r\n(function (Direction) {\r\n    Direction[Direction[\"RIGHT\"] = 0] = \"RIGHT\";\r\n    Direction[Direction[\"LEFT\"] = 1] = \"LEFT\";\r\n    Direction[Direction[\"DOWN\"] = 2] = \"DOWN\";\r\n    Direction[Direction[\"UP\"] = 3] = \"UP\";\r\n})(Direction || (Direction = {}));\r\n\n\n//# sourceURL=webpack://gra-2048/./src/enum.ts?");

/***/ }),

/***/ "./src/game-view.ts":
/*!**************************!*\
  !*** ./src/game-view.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameView\": () => /* binding */ GameView\n/* harmony export */ });\n/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enum */ \"./src/enum.ts\");\n\r\nclass GameView {\r\n    constructor() {\r\n        this._score = document.querySelector(\"#score\");\r\n        this._buttonNewGame = document.querySelector(\"#new-game\");\r\n        this._buttonTryAgain = document.querySelector(\"#try-again\");\r\n        this._buttonContinue = document.querySelector(\"#continue\");\r\n        this._board = document.querySelector(\".grid\");\r\n        this._fieldButtons = document.querySelector(\".container-messages\");\r\n        this._finalMessage = document.querySelector(\"#final-message\");\r\n    }\r\n    displayGameOverMessage() {\r\n        if (this._fieldButtons !== null && this._finalMessage !== null) {\r\n            this._fieldButtons.style.display = \"inherit\";\r\n            this._finalMessage.innerHTML = \"PRZEGRAŁEŚ!\";\r\n        }\r\n    }\r\n    displayWinMessage() {\r\n        if (this._fieldButtons !== null && this._buttonContinue !== null && this._finalMessage !== null) {\r\n            this._fieldButtons.style.display = \"inherit\";\r\n            this._buttonContinue.style.display = \"inherit\";\r\n            this._finalMessage.innerHTML = \"WYGRAŁEŚ!\";\r\n        }\r\n    }\r\n    hiddenMessage() {\r\n        if (this._fieldButtons !== null && this._buttonContinue !== null) {\r\n            this._fieldButtons.style.display = \"none\";\r\n            this._buttonContinue.style.display = \"none\";\r\n        }\r\n    }\r\n    displayScore(score) {\r\n        if (this._score !== null) {\r\n            this._score.textContent = String(score);\r\n        }\r\n    }\r\n    createBoard(board) {\r\n        if (this._board !== null) {\r\n            this._board.innerHTML = '';\r\n            for (let i = 0; i < board.length; i++) {\r\n                for (let j = 0; j < board.length; j++) {\r\n                    const plate = document.createElement('div');\r\n                    plate.id = \"tile\" + i + j;\r\n                    if (board[i][j].value > 2048) {\r\n                        plate.textContent = String(board[i][j].value);\r\n                        plate.className = \"tile-more\";\r\n                    }\r\n                    else if (board[i][j].value > 0 && board[i][j].value <= 2048) {\r\n                        plate.textContent = String(board[i][j].value);\r\n                        plate.className = \"tile-\" + board[i][j].value;\r\n                    }\r\n                    else {\r\n                        plate.className = \"tile\";\r\n                    }\r\n                    this._board.appendChild(plate);\r\n                }\r\n            }\r\n        }\r\n    }\r\n    displayBoard(board) {\r\n        for (let i = 0; i < board.length; i++) {\r\n            for (let j = 0; j < board.length; j++) {\r\n                const plate = document.getElementById(\"tile\" + i + j);\r\n                if (plate !== null) {\r\n                    if (board[i][j].value > 0) {\r\n                        plate.textContent = String(board[i][j].value);\r\n                        plate.className = \"tile-\" + board[i][j].value;\r\n                        if (board[i][j].value > 2048) {\r\n                            plate.className = \"tile-more\";\r\n                        }\r\n                        if (board[i][j].typeTile === _enum__WEBPACK_IMPORTED_MODULE_0__.TypeTile.NEW) {\r\n                            plate.classList.add('appear');\r\n                            board[i][j].typeTile = _enum__WEBPACK_IMPORTED_MODULE_0__.TypeTile.ORDINARY;\r\n                        }\r\n                        if (board[i][j].typeTile === _enum__WEBPACK_IMPORTED_MODULE_0__.TypeTile.CONNECTED) {\r\n                            plate.classList.add('pop');\r\n                            board[i][j].typeTile = _enum__WEBPACK_IMPORTED_MODULE_0__.TypeTile.ORDINARY;\r\n                        }\r\n                    }\r\n                    else {\r\n                        plate.textContent = String(\"\");\r\n                        plate.className = \"tile\";\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n    displayAnimationBoard(board, moveDirection) {\r\n        for (let i = 0; i < board.length; i++) {\r\n            for (let j = 0; j < board.length; j++) {\r\n                this.addAnimation(moveDirection, i, j, board[i][j].getPositions()[0].position());\r\n                if (board[i][j].typeTile === _enum__WEBPACK_IMPORTED_MODULE_0__.TypeTile.CONNECTED) {\r\n                    this.addAnimation(moveDirection, i, j, board[i][j].getPositions()[1].position());\r\n                    board[i][j].removeAddPosition();\r\n                }\r\n            }\r\n        }\r\n    }\r\n    addAnimation(moveDirection, i, j, position) {\r\n        const plate = document.getElementById(\"tile\" + position[0] + position[1]);\r\n        if (plate !== null && plate.textContent !== \"\") {\r\n            let x = Math.abs(j - position[1]);\r\n            let y = Math.abs(i - position[0]);\r\n            let amountShift;\r\n            y >= x ? amountShift = y : amountShift = x;\r\n            if (amountShift > 0 && amountShift < 4)\r\n                switch (moveDirection) {\r\n                    case _enum__WEBPACK_IMPORTED_MODULE_0__.Direction.RIGHT:\r\n                        plate.classList.add('move-right-' + amountShift);\r\n                        break;\r\n                    case _enum__WEBPACK_IMPORTED_MODULE_0__.Direction.LEFT:\r\n                        plate.classList.add('move-left-' + amountShift);\r\n                        break;\r\n                    case _enum__WEBPACK_IMPORTED_MODULE_0__.Direction.UP:\r\n                        plate.classList.add('move-up-' + amountShift);\r\n                        break;\r\n                    case _enum__WEBPACK_IMPORTED_MODULE_0__.Direction.DOWN:\r\n                        plate.classList.add('move-down-' + amountShift);\r\n                        break;\r\n                }\r\n        }\r\n    }\r\n    get buttonNewGame() {\r\n        return this._buttonNewGame;\r\n    }\r\n    get buttonTryAgain() {\r\n        return this._buttonTryAgain;\r\n    }\r\n    get buttonContinue() {\r\n        return this._buttonContinue;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://gra-2048/./src/game-view.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.ts\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-view */ \"./src/game-view.ts\");\n/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enum */ \"./src/enum.ts\");\n\r\n\r\n\r\nclass Game {\r\n    constructor(size) {\r\n        this._activeMove = false;\r\n        this._continueGame = false;\r\n        this._score = 0;\r\n        this._gameView = new _game_view__WEBPACK_IMPORTED_MODULE_1__.GameView();\r\n        this._board = new _board__WEBPACK_IMPORTED_MODULE_0__.Board(size);\r\n        this._gameView.hiddenMessage();\r\n        this.init();\r\n    }\r\n    init() {\r\n        var _a, _b, _c;\r\n        document.addEventListener(\"keydown\", this.executionMove.bind(this), false);\r\n        (_a = this._gameView.buttonNewGame) === null || _a === void 0 ? void 0 : _a.addEventListener(\"click\", this.newGame.bind(this));\r\n        (_b = this._gameView.buttonContinue) === null || _b === void 0 ? void 0 : _b.addEventListener(\"click\", this.continueGame.bind(this));\r\n        (_c = this._gameView.buttonTryAgain) === null || _c === void 0 ? void 0 : _c.addEventListener(\"click\", this.newGame.bind(this));\r\n        this._gameView.createBoard(this._board._board);\r\n        this._gameView.displayBoard(this._board._board);\r\n        this._gameView.displayScore(this._score);\r\n    }\r\n    newGame() {\r\n        this._score = 0;\r\n        this._activeMove = false;\r\n        this._board = new _board__WEBPACK_IMPORTED_MODULE_0__.Board(4);\r\n        this._gameView.hiddenMessage();\r\n        this._gameView.displayBoard(this._board._board);\r\n        this._gameView.displayScore(this._score);\r\n        this._continueGame = false;\r\n    }\r\n    continueGame() {\r\n        this._gameView.hiddenMessage();\r\n        this._activeMove = false;\r\n        this._continueGame = true;\r\n    }\r\n    executionMove(event) {\r\n        if (this._activeMove)\r\n            return;\r\n        this._activeMove = true;\r\n        let moveDirection = null;\r\n        if (!this.isWon() && !this.isGameOver()) {\r\n            switch (event.code) {\r\n                case _enum__WEBPACK_IMPORTED_MODULE_2__.KeyCode.RIGHT:\r\n                    this._board.moveRight();\r\n                    moveDirection = _enum__WEBPACK_IMPORTED_MODULE_2__.Direction.RIGHT;\r\n                    break;\r\n                case _enum__WEBPACK_IMPORTED_MODULE_2__.KeyCode.LEFT:\r\n                    this._board.moveLeft();\r\n                    moveDirection = _enum__WEBPACK_IMPORTED_MODULE_2__.Direction.LEFT;\r\n                    break;\r\n                case _enum__WEBPACK_IMPORTED_MODULE_2__.KeyCode.UP:\r\n                    this._board.moveUp();\r\n                    moveDirection = _enum__WEBPACK_IMPORTED_MODULE_2__.Direction.UP;\r\n                    break;\r\n                case _enum__WEBPACK_IMPORTED_MODULE_2__.KeyCode.DOWN:\r\n                    this._board.moveDown();\r\n                    moveDirection = _enum__WEBPACK_IMPORTED_MODULE_2__.Direction.DOWN;\r\n                    break;\r\n            }\r\n            if (this._board.isCorrectMove() && moveDirection !== null) {\r\n                this._score += this._board.pointCurrentMove;\r\n                this._gameView.displayAnimationBoard(this._board._board, moveDirection);\r\n                setTimeout(() => {\r\n                    this._board.updatePosition();\r\n                    this._gameView.displayScore(this._score);\r\n                    this._board.addTile();\r\n                    this._gameView.displayBoard(this._board._board);\r\n                    setTimeout(() => this._activeMove = false, 800);\r\n                }, 600);\r\n            }\r\n            else {\r\n                this._activeMove = false;\r\n            }\r\n        }\r\n    }\r\n    set score(score) {\r\n        this._score = score;\r\n    }\r\n    get score() {\r\n        return this._score;\r\n    }\r\n    isWon() {\r\n        if (!this._continueGame && this._board.isTile2048()) {\r\n            this._gameView.displayWinMessage();\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n    isGameOver() {\r\n        if (this._board.isFully()) {\r\n            if (!this._board.checkIsPossibleMove()) {\r\n                this._gameView.displayGameOverMessage();\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://gra-2048/./src/game.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.ts\");\n\r\nwindow.onload = function init() {\r\n    const game = new _game__WEBPACK_IMPORTED_MODULE_0__.Game(4);\r\n};\r\n\n\n//# sourceURL=webpack://gra-2048/./src/index.ts?");

/***/ }),

/***/ "./src/position.ts":
/*!*************************!*\
  !*** ./src/position.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Position\": () => /* binding */ Position\n/* harmony export */ });\nclass Position {\r\n    constructor(x = -1, y = -1) {\r\n        this._x = x;\r\n        this._y = y;\r\n    }\r\n    position() {\r\n        return [this._x, this._y];\r\n    }\r\n    setPosition(x, y) {\r\n        this._x = x;\r\n        this._y = y;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://gra-2048/./src/position.ts?");

/***/ }),

/***/ "./src/tile.ts":
/*!*********************!*\
  !*** ./src/tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tile\": () => /* binding */ Tile\n/* harmony export */ });\n/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./position */ \"./src/position.ts\");\n/* harmony import */ var _enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enum */ \"./src/enum.ts\");\n\r\n\r\nclass Tile {\r\n    constructor(previousItem = new _position__WEBPACK_IMPORTED_MODULE_0__.Position(), value = 0, typeTile = _enum__WEBPACK_IMPORTED_MODULE_1__.TypeTile.EMPTY) {\r\n        this._value = value;\r\n        this._previousItem = [];\r\n        this._previousItem[0] = previousItem;\r\n        this._typeTile = typeTile;\r\n    }\r\n    get value() {\r\n        return this._value;\r\n    }\r\n    set value(value) {\r\n        this._value = value;\r\n    }\r\n    updatePosition(position) {\r\n        this._previousItem[0] = position;\r\n    }\r\n    addPosition(position) {\r\n        this._previousItem[1] = position;\r\n    }\r\n    removeAddPosition() {\r\n        this._previousItem.length = 1;\r\n    }\r\n    getPositions() {\r\n        return this._previousItem;\r\n    }\r\n    checkPosition(position) {\r\n        const pos = this._previousItem[0].position();\r\n        const x = pos[0];\r\n        const y = pos[1];\r\n        return x !== position[0] || y !== position[1];\r\n    }\r\n    get typeTile() {\r\n        return this._typeTile;\r\n    }\r\n    set typeTile(typeTile) {\r\n        this._typeTile = typeTile;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://gra-2048/./src/tile.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;