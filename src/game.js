import getData from "./data.js";

export default class Sokoban {
    // static property
    // static MAX_LEVEL = 10;
    // static ITEM_WIDTH = 32;
    // some constructor
    constructor({container}){
        this.container = container;     // map container
        this._MAX_LEVEL = 10;
        this._ITEM_WIDTH = 32;
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

    init(level = this.level) {
        // by default it is the current level
        this.clear();
        const {trees, boxes, goals, player} = getData(level);
        // trees.forEach(tree => console.log(tree));
    }

    get player() {
        // the class name of player is player
        return this.container.querySelector('.player');
    }

    move(direction) {
        const player = this.player;
        const x = Number(player.dataset.x);
        const y = Number(player.dataset.y);

        switch(direnction) {
            case 'left':
                break;
            case 'right':
                break;
            case 'up':
                break;
            case 'down':
                break;
            default:
                console.log('not possible');
                break;
        }
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
        if ( Number.isNaN(level) || level <= 0 || level > this._MAX_LEVEL) {
            level = 1;
        }
        console.log(level);
        this.init(level);
        do {
            const direction = await this.polling();
            if (direction) {
                // move
                console.log(direction);
            }
        } while (!this.isWin());
        await OnWin(level);
    }
}