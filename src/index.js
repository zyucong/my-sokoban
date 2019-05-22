// import Sokoban from "./game"

// function wait(ms) {
//     // some delay
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }


class Sokoban {
    // static property
    // static MAX_LEVEL = 10;
    // static ITEM_WIDTH = 32;
    // some constructor
    constructor({}){
        this._MAX_LEVEL = 10;
        this._ITEM_WIDTH = 32;
    }
    // methods
    wait(ms) {
        // some delay
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
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
            this._command = (event) => {
                const keyCode = event.keyCode;
                switch (keyCode) {
                    case 37:
                    case 65:
                        console.log('left');
                        resolve('left');
                        break;
                    case 38:
                    case 87:
                        console.log('up');
                        resolve('up');
                        break;
                    case 39:
                    case 68:
                        console.log('right');
                        resolve('right');
                        break;
                    case 40:
                    case 83:
                        console.log('down');
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
        do {
            const direction = await this.polling();
            if (direction) {
                // move
            }
        } while (!this.isWin());
        await OnWin(level);
    }
}


const app = new Sokoban({});

const previousLevel = document.getElementById('previous-level');
const currentLevel = document.getElementById('current-level');
const nextLevel = document.getElementById('next-level');
const reset = document.getElementById('reset');

let gameLevel = parseInt(localStorage.getItem('gamelevel'), 10) || 1;

currentLevel.addEventListener('change', ({target}) => {
    console.log(target.value);
    app.load(Number(target.value));
});

previousLevel.addEventListener('click', () => {
    console.log('previous-level');
    app.load(app.level - 1);
});

nextLevel.addEventListener('click', () => {
    console.log('next-level');
    app.load(app.level + 1);
});

reset.addEventListener('click', () => {
    console.log('reset');
    app.load(app.level);
});

window.app = app;