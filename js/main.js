const timer = document.querySelector('.clock__timer')

const currentTime = function () {
    const time = new Date();

    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    timer.textContent = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}

setInterval(currentTime, 100)