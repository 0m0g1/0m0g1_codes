const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLighting() {
    const start = {
        x: getRandomInt(center.x - 10, center.x + 10),
        y: 0,
    }

    for (let y = 0; y < canvas.width; y++) {

    }
}