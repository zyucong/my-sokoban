

export default class Sokoban {
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
    onWin(level) {
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
                switch (keycode) {
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