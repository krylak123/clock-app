const timer = document.querySelector('.clock__timer')
const btnsOptions = document.querySelectorAll('.clock__btn')
const modeContent = document.querySelector('.clock__mode--span')
const optionPanel = document.querySelector('.clock__option-panel')

let indexInterval;

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

//OPTION TIMER
const optionTimer = function () {
    optionPanel.style.display = `block`;
    modeContent.textContent = `timer`;

    //CREATING PANEL FOR TIMER
    for (let i = 0; i < 3; i++) {
        const input = document.createElement('input')
        input.classList.add('clock__form-timer')
        input.setAttribute('type', 'number')
        input.setAttribute('min', '0')
        if (i === 0) {
            input.setAttribute('placeholder', 'hours')
            input.setAttribute('id', 'hours')
        }
        if (i === 1) {
            input.setAttribute('placeholder', 'minutes')
            input.setAttribute('id', 'minutes')
            input.setAttribute('max', '60')
        }
        if (i === 2) {
            input.setAttribute('placeholder', 'seconds')
            input.setAttribute('id', 'seconds')
            input.setAttribute('max', '60')
        }
        optionPanel.appendChild(input)
    }
    const btn = document.createElement('button')
    btn.textContent = 'start';
    btn.classList.add('clock__btn')
    btn.setAttribute('id', 'start')
    optionPanel.appendChild(btn)

    //EVENT SERVICE
    const start = document.getElementById('start')
    const inputHours = document.getElementById('hours')
    const inputMinutes = document.getElementById('minutes')
    const inputSeconds = document.getElementById('seconds')

    start.addEventListener('click', () => {
        let hours = Number(inputHours.value);
        if (hours === "") hours = 0;
        let minutes = Number(inputMinutes.value);
        if (minutes === "") minutes = 0;
        let seconds = Number(inputSeconds.value);
        if (seconds === "") seconds = 0;

        if (seconds > 60) seconds = 60;
        if (minutes > 60) minutes = 59;

        optionPanel.textContent = '';

        indexInterval = setInterval(() => {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
            }

            timer.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

            if (hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(indexInterval)
                return alert('time end!');
            }
        }, 1000)
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
        case "btnTimer":
            clearInterval(indexInterval);
            optionTimer();
            break;
    }
}

btnsOptions.forEach(btn => btn.addEventListener('click', controlFunction))