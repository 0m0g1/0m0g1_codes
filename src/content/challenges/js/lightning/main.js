const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

pen.strokeStyle = "white";
pen.lineWidth = 2;
pen.shadowBlur = 20;
pen.shadowColor = "#00a4eb";

function getRandomInterger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLightning(x = null, counter = 0) {
    pen.clearRect(0, 0, canvas.width, canvas.height);

    const lightning = {
        x: (x === null) ?  getRandomInterger(100, canvas.width - 100) : x,
        y: 0,
        length: getRandomInterger(canvas.height / 2.5, canvas.height),
    }

    const rootX = lightning.x;
    
    pen.beginPath();
    pen.moveTo(lightning.x, lightning.y);

    while (lightning.y < lightning.length) {
        lightning.x += getRandomInterger(-10, 10);
        lightning.y += getRandomInterger(-1, 35);
        pen.lineTo(lightning.x, lightning.y);

        if (getRandomInterger(0, 5) == 5) {
            generateBranch(lightning.x, lightning.y);
        }

    }
    
    function generateBranch(x, y) {
        const branch = {
            x: x,
            y: y,
            length: getRandomInterger(y + 100, y + 300),
        }

        while (branch.y < branch.length) {
            branch.x += getRandomInterger(-5, 5);
            branch.y += getRandomInterger(2, 20);
            pen.lineTo(branch.x, branch.y);
        }

        pen.moveTo(x, y);
    }

    if (counter < 8) {
        setTimeout(() => {
            generateLightning(rootX, counter + 1)
        }, 50)
    } else {
        setTimeout(() => {
            pen.clearRect(0, 0, canvas.width, canvas.height);
        }, 200)
    }

    pen.stroke();
    pen.closePath();
}

function generateRandomLightning() {
    setTimeout(() => {
        generateLightning();
        generateRandomLightning();
    }, getRandomInterger(500, 2000))
}

generateRandomLightning();