import getData from "./data.js";
import { BOUND_X, BOUND_Y } from "../../config.js";

// const _level = Symbol('level');

export default class Sokoban {
    // static property
    // static MAX_LEVEL = 10;
    // static ITEM_WIDTH = 32;
    // some constructor
    constructor({_level, container, onload}){
        this.container = container;     // map container
        this.onload = onload;
        this._MAX_LEVEL = 5;
        this._ITEM_WIDTH = 32;
        this._level = _level;
    }
    // methods

    clear(){
        this.container.innerHTML = '';
    }

    wait(ms) {
        // some delay
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    // init the map
    init(level = this.level) {
        // by default it is the current level
        console.log(level);
        this.clear();
        const {trees, boxes, goals, player} = getData(level);
        // trees.forEach(tree => console.log(tree));
        // console.log(trees)
        trees.forEach(tree => {this.addItem('tree', tree[0], tree[1])});
        boxes.forEach(box => {this.addItem('box', box[0], box[1])});
        goals.forEach(goal => {this.addItem('goal', goal[0], goal[1])});
        this.addItem('player', ...player);
    }

    get player() {
        // the class name of player is player
        return this.container.querySelector('.player');
    }

    get level() {
        // return this[_level];
        return this._level;
    }

    addItem(type, x, y) {
        const item = document.createElement('i');
        item.className = type;
        if (type === 'player') {
            item.className += ' down';
        }
        // item.dataset.x = x;
        // item.dataset.y = y;
        this.moveTo(item, x, y);
        this.container.appendChild(item);
    }

    getItem(x, y) {
        const items = this.container.children;
        for (const item of items) {
            if (Number(item.dataset.x) === x
             && Number(item.dataset.y) === y
             && item.className !== 'goal') {
                 return item;
             }
        }
        return null;
    }

    // moveItem(item, direction) {

    // }
    moveTo(item, x, y) {
        item.dataset.x = x;
        item.dataset.y = y;
        item.style.left = `${x * this._ITEM_WIDTH}px`;
        item.style.top = `${y * this._ITEM_WIDTH}px`;
    }

    move(direction) {
        const player = this.player;
        const x = Number(player.dataset.x);
        const y = Number(player.dataset.y);

        let item = null;
        let newX = null;
        let newY = null;

        switch(direction) {
            case 'left':
                item = this.getItem(x - 1, y);
                newX = x - 1;
                newY = y;
                break;
            case 'right':
                item = this.getItem(x + 1, y);
                newX = x + 1;
                newY = y;
                break;
            case 'up':
                item = this.getItem(x, y - 1);
                newX = x;
                newY = y - 1;
                break;
            case 'down':
                item = this.getItem(x, y + 1);
                newX = x;
                newY = y + 1;
                break;
            default:
                console.log('not possible');
                break;
        }
        // console.log(item);
        player.className = `player ${direction}`;

        if (!item) {
            // no obstacle along the way
            // player.className = `player ${direction}`;
            this.moveTo(player, newX, newY);
            return;
        }
        if (item.className === 'box') {
            // now to push the box ahead
            if (direction === 'left' && this.isEmpty(x - 2, y)) {
                this.moveTo(player, x - 1, y);
                this.moveTo(item, x - 2, y);
            } else if (direction === 'right' && this.isEmpty(x + 2, y)) {
                this.moveTo(player, x + 1, y);
                this.moveTo(item, x + 2, y);
            } else if (direction === 'up' && this.isEmpty(x, y - 2)) {
                this.moveTo(player, x, y - 1);
                this.moveTo(item, x, y - 2);
            } else if (direction === 'down' && this.isEmpty(x, y + 2)) {
                this.moveTo(player, x, y + 1);
                this.moveTo(item, x, y + 2);
            }
            //  || direction === 'right' && this.isEmpty(x + 2, y)
            //  || direction === 'up' && this.isEmpty(x, y - 2)
            //  || direction === 'down' && this.isEmpty(x, y + 2)) {
                 // has space to move
        }
    }

    withinRange(x, y) {
        return x >= 0 && y >= 0 && x < BOUND_X && y < BOUND_Y;
    }

    isEmpty(x, y) {
        console.log(this.withinRange(x, y) && !this.getItem(x, y));
        return this.withinRange(x, y) && !this.getItem(x, y);
    }

    async onWin(level) {
        // level should be retrieved from localStorage
        const congrat = document.getElementById('result');
        congrat.innerText = "You Win!";
        congrat.className = 'show';
        await this.wait(1300);
        congrat.innerText = '';
        congrat.className = '';
        await this.wait(200);
        this.load(level + 1);
    }

    polling () {
        return new Promise(resolve => {
            if (this._command) 
                window.removeEventListener('keydown', this._command);
            this._command = (e) => {
                const keyCode = e.keyCode;
                switch (keyCode) {
                    case 37:
                    case 65:
                        // console.log('left');
                        resolve('left');
                        break;
                    case 38:
                    case 87:
                        // console.log('up');
                        resolve('up');
                        break;
                    case 39:
                    case 68:
                        // console.log('right');
                        resolve('right');
                        break;
                    case 40:
                    case 83:
                        // console.log('down');
                        resolve('down');
                        break;
                    default:
                        resolve(null);
                        break;
                }
            };
            window.addEventListener('keydown', this._command, {once: true});
        });
    }

    isWin() {
        return false;
    }

    async load(level) {
        if ( Number.isNaN(level) || level <= 0 
        || level > this._MAX_LEVEL) {
            level = 1;
        }
        // this[_level] = level;
        this._level = level;
        // console.log(level);
        this.init(level);
        this.onload(level);
        do {
            const direction = await this.polling();
            if (direction) {
                // move
                console.log(direction);
                this.move(direction);
            }
        } while (!this.isWin());
        await OnWin(level);
    }
}