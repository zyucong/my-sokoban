import Sokoban from "./game.js";

// function wait(ms) {
//     // some delay
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }


const app = new Sokoban({
    container: document.getElementById('map')
});

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