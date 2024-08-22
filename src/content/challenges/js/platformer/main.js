const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pan = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
}

let ispanning = false;

const cellSize = 16;
const player = {
    x: getRandomInt(0, canvas.width),
    y: getRandomInt(0, canvas.height),
    previousX: 0,
    previousY: 0,
    speed: 2,
}
const platforms = [];
const pressedKeys = {};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPlatforms() {
    for (let i = 0; i < 40; i++) {
        const platform = createPlatform();
        platforms.push(platform);

        const isContinuous = getRandomInt(0, 5);

        if (isContinuous > 1) {
            for (let i = 1; i < getRandomInt(5, 20); i++) {
                platforms.push(createPlatform(platform.x + (cellSize * i), platform.y)); 
            }
        }

    }
}

function createPlatform(x = null, y = null) {
    let platform = {
        x: (x === null) ? Math.floor(getRandomInt(0, canvas.width) / cellSize) * cellSize : x,
        y: (y === null) ? Math.floor(getRandomInt(0, canvas.height) / cellSize)* cellSize : y,
    }
    
    platforms.forEach((neighbour) => {
        if (neighbour.x == platform.x && neighbour.y == platform.y) {
            platform = createPlatform();     
        }
    })
    
    return platform;
}

function drawGrid() {
    pen.beginPath();
    for (let x = pan.x; x <= canvas.width + pan.x; x += cellSize) {
        pen.moveTo(x, pan.y);
        pen.lineTo(x, canvas.height);
    }
    for (let y = pan.y; y <= canvas.height + pan.y; y += cellSize) {
        pen.moveTo(pan.x, y);
        pen.lineTo(canvas.width, y);
    }
    pen.stroke();
    pen.closePath();
}


function drawPlayer() {
    pen.fillStyle = "red";
    pen.beginPath();
    pen.fillRect(player.x, player.y, cellSize, cellSize);
    pen.closePath();
    pen.fillStyle = "black";
}

function updatePlayer() {
    if (player.y < canvas.height - cellSize) {
        player.y += 10;
    }
    if (pressedKeys["w"] > 0) {
        player.y -= cellSize;
        pressedKeys["w"]--;
    }
    if (pressedKeys["a"] > 0) {
        player.x -= player.speed;
        pressedKeys["a"]--;
    }
    if (pressedKeys["d"] > 0) {
        player.x += player.speed;
        pressedKeys["d"]--;
    }

    // Check for collisions with platforms
    platforms.forEach((platform) => {
        if (isIntersecting(player, platform)) {
            setIntersectionPosition(player, platform);
        }
    });
}

function isIntersecting(a, b) {
    return (
        a.x < b.x + cellSize && 
        a.x + cellSize > b.x &&
        a.y < b.y + cellSize &&
        a.y + cellSize > b.y
    );
}

function setIntersectionPosition(a, b) {
    // Determine the direction of the collision
    if (a.x + cellSize > b.x && a.x < b.x) {
        a.x = b.x - cellSize; // Collided on the right
    } else if (a.x < b.x + cellSize && a.x + cellSize > b.x + cellSize) {
        a.x = b.x + cellSize; // Collided on the left
    } else if (a.y + cellSize > b.y && a.y < b.y) {
        a.y = b.y - cellSize; // Collided below
    } else if (a.y < b.y + cellSize && a.y + cellSize > b.y + cellSize) {
        a.y = b.y + cellSize; // Collided above
    }
}

function update() {
    updatePlayer();    
}

function render() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlayer();
    platforms.forEach((platform) => {
        pen.fillRect(platform.x, platform.y, cellSize, cellSize);
    })
}


document.onkeydown = (e) => {
    pressedKeys[e.key.toLowerCase()] = cellSize;
}

function run() {
    update();
    render();
    requestAnimationFrame(run);
}

createPlatforms();

run();