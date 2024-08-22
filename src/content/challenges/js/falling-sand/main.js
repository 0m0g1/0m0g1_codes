const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 16;
const particles = [];
let isdrawing = false;
const gridSize = {
    x: Math.floor(canvas.width / cellSize),
    y: Math.floor(canvas.height / cellSize),
}

function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandColor() {
    return `rgb(${getRandInteger(0, 255)}, ${getRandInteger(0, 255)}, ${getRandInteger(0, 255)})`
}

function addParticle(e) {
    const particlePostion = {
        x: Math.floor(e.clientX / cellSize),
        y: Math.floor(e.clientY / cellSize),
        color: getRandColor(),
    }

    let shouldAddParticle = true;
    for (const particle in particles) {
        if (particle.x === particlePostion.x && particle.y === particlePostion.y) {
            shouldAddParticle = false;
            break;
        }
    }

    if (shouldAddParticle) {
        particles.push(particlePostion);
    }

    render();
}

function drawGrid() {
    for (let x = 0; x <= canvas.width; x += cellSize) {
        pen.moveTo(x, 0);
        pen.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += cellSize) {
        pen.moveTo(0, y);
        pen.lineTo(canvas.width, y);
    }
    pen.stroke();
}


function update() {
    // drawGrid();
    
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        if (particle.y >= gridSize.y) continue;

        let shouldUpdate = true;
        for (let j = 0; j < particles.length; j++) {
            const neighbourParticle = particles[j];
            if (neighbourParticle.x === particle.x && neighbourParticle.y === particle.y + 1) {  
                shouldUpdate = false;
                break;
            }
        }
        
        if (shouldUpdate) {
            particle.y += 1;
        }
    }
    
}

function render() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        pen.beginPath();
        pen.fillStyle = particle.color;
        pen.rect(particle.x * cellSize, particle.y * cellSize, cellSize, cellSize);
        pen.fill();
    })
}

document.onmousedown = (e) => {
    isdrawing = true;
    addParticle(e);
}

document.onmousemove = (e) => {
    if (isdrawing) {
        addParticle(e);
    }
}

document.onmouseup = () => {
    isdrawing = false;
}

setInterval(() => {
    update();
    render();
}, 40)

update();