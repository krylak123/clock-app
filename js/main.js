const timer = document.querySelector('.clock__timer')
const btnsOptions = document.querySelectorAll('.clock__btn')
const modeContent = document.querySelector('.clock__mode--span')
const optionPanel = document.querySelector('.clock__option-panel')

let currentMode = true;
let indexInterval;
// let time = 0;

const currentTime = function () {
    const time = new Date();

    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    timer.textContent = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}

indexInterval = setInterval(currentTime, 100)

//OPTION CLOCK
const optionClock = function () {
    optionPanel.style.display = `none`;
    modeContent.textContent = `clock`;
    indexInterval = setInterval(currentTime, 100)
}

//OPTION STOPWATCH
const optionStopwatch = function () {
    let time = 0;
    let active = false;

    //CREATING PANEL FOR STOPWATCH
    modeContent.textContent = `stopwatch`;
    for (let i = 0; i < 2; i++) {
        const btn = document.createElement('button')
        btn.classList.add('clock__btn')

        if (i === 0) {
            btn.setAttribute('id', 'start-pause')
            btn.textContent = `start`;
        } else if (i === 1) {
            btn.setAttribute('id', 'restart')
            btn.textContent = `restart`;
        }

        optionPanel.appendChild(btn)
    }

    //DISPLAY FOR STOPWATCH
    optionPanel.style.display = `block`;
    timer.textContent = `${(time / 100).toFixed(2)}s`;

    //EVENTS SERVICE
    const startPause = document.getElementById('start-pause')
    const restart = document.getElementById('restart')

    startPause.addEventListener('click', () => {
        if (!active) {
            startPause.textContent = `pause`;
            active = !active;
            indexInterval = setInterval(() => {
                time++;
                timer.textContent = `${(time / 100).toFixed(2)}s`;
            }, 10)
        } else {
            active = !active;
            startPause.textContent = `start`;
            clearInterval(indexInterval)
        }
    })

    restart.addEventListener('click', () => {
        clearInterval(indexInterval)
        time = 0;
        active = false;
        startPause.textContent = `start`;
        timer.textContent = `${(time / 100).toFixed(2)}s`;
    })

}

//CONROL FUNCTION
const controlFunction = function () {
    timer.textContent = ``;
    optionPanel.textContent = ``;

    switch (this.id) {
        case "btnClock":
            clearInterval(indexInterval);
            optionClock();
            break;
        case "btnStopwatch":
            clearInterval(indexInterval);
            optionStopwatch();
            break;
    }
}

btnsOptions.forEach(btn => btn.addEventListener('click', controlFunction))