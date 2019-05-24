import getData from "./data.js";

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

    addItem(type, x, y) {
        const item = document.createElement('i');
        item.className = type;
        if (type === 'player') {
            item.className += ' down';
        }
        item.dataset.x = x;
        item.dataset.y = y;
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

    get player() {
        // the class name of player is player
        return this.container.querySelector('.player');
    }

    get level() {
        // return this[_level];
        return this._level;
    }

    move(direction) {
        const player = this.player;
        const x = Number(player.dataset.x);
        const y = Number(player.dataset.y);

        let item = null;

        switch(direction) {
            case 'left':
                item = this.getItem(x - 1, y);
                break;
            case 'right':
                item = this.getItem(x + 1, y);
                break;
            case 'up':
                item = this.getItem(x, y - 1);
                break;
            case 'down':
                item = this.getItem(x, y + 1);
                break;
            default:
                console.log('not possible');
                break;
        }
        console.log(item);
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