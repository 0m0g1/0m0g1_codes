const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 32;
const objectPos = {
    x: 0,
    y: 0
}

function drawGrid() {
    for (let x = 0; x <= canvas.width; x += cellSize) {
        pen.moveTo(x, 0);
        pen.lineTo(x, canvas.width);
    }
    for (let y = 0; y <= canvas.height; y += cellSize) {
        pen.moveTo(0, y);
        pen.lineTo(canvas.width, y);
    }
    pen.stroke();
}

function drawObject() {
    pen.fillRect(objectPos.x, objectPos.y, cellSize, cellSize);
}

function getDirection(e) {
    if (e.key == "w") {
        objectPos.y -= cellSize;
    } else if (e.key == "d") {
        objectPos.x += cellSize;
    } else if (e.key == "a") {
        objectPos.x -= cellSize;
    } else if (e.key == "s") {
        objectPos.y += cellSize;
    }
    update();
}

function update() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawObject();
}

document.onkeydown = (e) => {
    getDirection(e);
}

update();