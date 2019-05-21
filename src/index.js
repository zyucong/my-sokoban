

function wait(ms) {
    // some delay
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const previousLevel = document.getElementById('previous-level');
const currentLevel = document.getElementById('current-level');
const nextLevel = document.getElementById('next-level');
const reset = document.getElementById('reset');

let gameLevel = parseInt(localStorage.getItem('gamelevel'), 10) || 1;

currentLevel.addEventListener('change', ({target}) => {
    console.log(target.value);
});

previousLevel.addEventListener('click', () => {
    console.log('previous-level');
});

nextLevel.addEventListener('click', () => {
    console.log('next-level');
});

reset.addEventListener('click', () => {
    console.log('reset');
});