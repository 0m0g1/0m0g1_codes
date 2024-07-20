const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rainDrops = [];

pen.strokeStyle = "blue";
function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createRainDrops() {
    const noOfDrops = 500;
    for (let i = 0; i < noOfDrops; i++) {
        rainDrops.push({
            x: getRandInt(0, canvas.width),
            y: getRandInt(-50, -canvas.height),
            length: getRandInt(5, 15),
            width: getRandInt(2, 4),
        })
    }
}
z
function update() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    rainDrops.forEach((drop) => {
        pen.beginPath();
        pen.lineWidth = drop.width;
        pen.moveTo(drop.x, drop.y);
        pen.lineTo(drop.x, drop.y + drop.length);
        pen.stroke();
        drop.y += (drop.length + drop.width) / 2.5;
        
        if (drop.y > canvas.height) {
            drop.y = getRandInt(-50, -canvas.height);
            drop.x = getRandInt(0, canvas.width);
            drop.width = getRandInt(2, 4);
            drop.length = getRandInt(5, 15)
        }

    })
    requestAnimationFrame(update);
}

createRainDrops();
update();