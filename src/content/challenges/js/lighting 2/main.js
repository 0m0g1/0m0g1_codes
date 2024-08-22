const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

pen.strokeStyle = "white";
pen.lineWidth = 2;
pen.shadowBlur = 10;
pen.shadowColor = "#00a4eb"
function generateLightning(x = null, count = 0) {
    pen.clearRect(0, 0, canvas.width, canvas.height);

    const lightning = {
        x: (x === null) ? getRandomInteger(100, canvas.width - 100) : x,
        y: 0,
        length: getRandomInteger(canvas.height / 2.5, canvas.height),
        direction: getRandomInteger(-5, 5),
    };
    
    lightning.rootX = lightning.x,

    pen.beginPath();
    pen.moveTo(lightning.x, lightning.y);

    while (lightning.y < lightning.length) {
        lightning.x += getRandomInteger(lightning.direction - 20, lightning.direction + 20);
        lightning.y += getRandomInteger(-1, 25);
        pen.lineTo(lightning.x, lightning.y);

        if (getRandomInteger(0, 10) == 1) {
            generateBranch(lightning.x, lightning.y);
        }
    }

    function generateBranch(x, y, branchcount = 0) {
        const branch = {
            x: x,
            y: y,
            length: x + getRandomInteger(y + 50, y + 300),
        }
        
        while (branch.y < branch.length) {
            branch.x += getRandomInteger(lightning.direction - 10, lightning.direction + 10);
            branch.y += getRandomInteger(-1, 25);
            pen.lineTo(branch.x, branch.y)

            if (getRandomInteger(0, 50) > 48 && branchcount < 3) {
                generateBranch(branch.x, branch.y, branchcount + 1);
            }
        }
        pen.moveTo(x, y);
    }

    if (getRandomInteger(0, 5) > 1 && count < 8) {
        setTimeout(() => {
            generateLightning(lightning.rootX, count + 1)
        }, getRandomInteger(50, 100))
    } else {
        setTimeout(() => {
            pen.clearRect(0, 0, canvas.width, canvas.height);
        }, 700, 800);
    }
    
    pen.stroke();
    pen.closePath();
}

function generateRandomLightning() {
    generateLightning();
    setTimeout(() => {
        generateRandomLightning();
    }, getRandomInteger(300, 3000))
}

generateRandomLightning();