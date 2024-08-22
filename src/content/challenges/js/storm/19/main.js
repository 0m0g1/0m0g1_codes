let y = 0;
let isLightning = false;
let drops = [];
const generateBtn = document.querySelector("#generate-btn");
const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas-2');
const pen2 = canvas2.getContext('2d');
const glows = ["#ffffff", "#00a4eb", "#eba4eb", "#00eba4" , "#FFD700"]

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Lightning
generateLighting = () => {
    pen.strokeStyle = "white";
    pen.fillStyle = "white";
    if (!isLightning) {
        isLightning = true;
        document.querySelector("#darken").style.backdropFilter = "brightness(0.7) grayscale(0.6)";
        let x = getRndInteger(100, canvas.width - 100);
        let i = 0;
        const strokes = getRndInteger(5, 8);
        pen.shadowColor = glows[getRndInteger(0, glows.length - 1)];
        
        function generateBranch(xpos, ypos) {
            pen.globalAlpha = 0.1;

            let xlength = xpos;
            let yheight = ypos;
            let maxHeight = getRndInteger(yheight + 100, yheight + canvas.height / 3);

            pen.moveTo(xpos, ypos);
            pen.lineWidth = 0;

            while (yheight < maxHeight) {
                if (getRndInteger(0, 1) == 1) {
                    xlength = getRndInteger(xlength - 1, xlength + 40);
                } else {
                    xlength = getRndInteger(xlength - 40, xlength + 1);
                }
                
                yheight = getRndInteger(yheight - 1, yheight + 20);
                pen.lineTo(xlength, yheight);
                
                if (getRndInteger(0, 50) == 1) {
                    generateBranch(xlength, yheight);
                }    

                yheight ++;
            }

            pen.moveTo(xpos, ypos);
            pen.globalAlpha = 1;
        }

        function generateStroke(x, y) {
            pen.clearRect(0, 0, canvas.width, canvas.height);
            let direction = getRndInteger(-5, 5);

            let prevX = x;
            let prevY = y;

            pen.moveTo(x, y);
            pen.beginPath();

            while (y < canvas.height) {
                prevX = x;
                prevY = y;

                if (direction == 5) {
                    x = getRndInteger((x-15), (x+30));
                } else if (direction == -5) {
                    x = getRndInteger((x-30), (x+15));
                } else {
                    x = getRndInteger((x-25), (x+25));
                }

                
                if (y != 0) {y = getRndInteger((y-1), (y+25));}
                pen.shadowBlur = 20; // Adjust the blur level for desired glow effect
                pen.lineWidth = getRndInteger(1, 3);
                pen.lineTo(x, y);

                if(getRndInteger(0, 10) == 1) {
                    generateBranch(x, y);
                }

                y++;
            }
            
            pen.stroke();

            setTimeout(() => {
                document.querySelector("#darken").style.backdropFilter = "brightness(0.9) grayscale(0.1)";
                if(i = strokes) pen.clearRect(0, 0, canvas.width, canvas.height)
                isLightning = false;
            }, getRndInteger(1200, 1500));
        };
        
        for (i = 0; i <= strokes; i++) {
                setTimeout(() => {
                    generateStroke(x, y);
                }, getRndInteger(200, 700));
        }
}
}

generateBtn.onclick = generateLighting;

generateRandomLightning = () => {
    generateLighting();
    setTimeout(generateRandomLightning, getRndInteger(700, 3000));
}

generateRandomLightning();

//Rain
function generateDrop() {
    let x = getRndInteger(0, canvas.width);
    let y = getRndInteger(0, canvas.height);
    let length = getRndInteger(5, 15);
    let speed = 0;
    let opacity = getRndInteger(4, 9) * 0.1;
    if (length > 10) {
        speed = 6;
    } else if (length >= 7) {
        speed = 5;
    } else {
        speed = 4;
    }
    drops.push({x: x, y: y, length: length, speed: speed, opacity: opacity});
}

function drawDrop(drop) {
    pen2.globalAlpha = drop.opacity;
    pen2.moveTo(drop.x, drop.y);
    pen2.lineTo(drop.x, drop.y + drop.length);
}

function updateRain() {
    pen2.clearRect(0, 0, canvas.width, canvas.height);

    pen2.beginPath();
    pen2.strokeStyle = "blue";

    for(let i = 0; i < drops.length; i++) {
        
        if(getRndInteger(0, 3) == 1) {
            pen2.lineWidth = 1;
        } else {
            pen2.lineWidth = 2;
        }
        drawDrop(drops[i]);
        drops[i].y += drops[i].speed;
        if (drops[i].y > canvas.height) {
            drops[i].x = getRndInteger(0, canvas.width);
           if (getRndInteger(0, 5) == 1) { 
                drops[i].y = getRndInteger(0, canvas.height);;
            } else {
                drops[i].y = -10;
            }
        }
    }
    pen2.stroke();
}

for (let i = 0; i < 400; i++) {
    generateDrop();
}

function animate() {
    requestAnimationFrame(animate);
    updateRain();
}

animate();