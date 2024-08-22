const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];

function drawTrail(){
    pen.clearRect(0, 0, canvas.width, canvas.height);
    
    if (points.length > 0) {
        pen.beginPath();
        pen.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            pen.lineTo(points[i].x, points[i].y);
        }
        pen.stroke();
        points.pop();
    }

    requestAnimationFrame(drawTrail)
}


document.onmousemove = (e) => {
    if (points.length < 40) {
        points.unshift({
            x: e.clientX,
            y: e.clientY,
        })
    }
}

drawTrail();