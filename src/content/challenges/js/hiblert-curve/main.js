const canvasWrapper = document.querySelector("#canvas-wrapper");
const canvas = document.querySelector("#canvas");
const pen = canvas.getContext("2d");

canvas.width = canvasWrapper.getBoundingClientRect().width;
canvas.height = canvasWrapper.getBoundingClientRect().height;

pen.strokeStyle = "#01010188";
pen.lineWidth = 1;

let order = 3 ;
const n = 2** order;
let noOfPoints = n * n;

const path = [];

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

pen.translate(center.x, center.y);

function hilbert(i) {
    const unit = order;
    const point = {x: 0, y: 0};
    
    
    for (let j = 1; j <= order; j++) {
        const scaledUnit = (unit / j);

        if (i % 4 == 0) {
            point.x -= scaledUnit;
            point.y += scaledUnit;
        } else if (i % 4 == 2) {
            point.x += scaledUnit;
            point.y -= scaledUnit;
        } else if (i % 4 == 3) {
            point.x += scaledUnit;
            point.y += scaledUnit;
        } else {
            point.y -= scaledUnit;
            point.x -= scaledUnit;
        }
    }
    
    let k = i >> 2;
    for (let j = order; j > 0; j--) {
        if (order == 1) {
            break;
        }
        
        const scaledUnit = (unit * j);

        point.x += scaledUnit / (2 ** order);
        point.y -= scaledUnit / (2 ** order);

        const index = k & 3;

        if (index % 4 == 0) {
            point.x -= scaledUnit;
            point.y += scaledUnit;
        } else if (index % 4 == 2) {
            point.x += scaledUnit;
            point.y -= scaledUnit;
        } else if (index % 4 == 3) {
            point.x += scaledUnit;
            point.y += scaledUnit;
        } else {
            point.x -= scaledUnit;
            point.y -= scaledUnit;
        }

        k = k >> 2;
    }

    const length = (canvas.width / (2 ** (2 * order)));
    point.x *= length;
    point.y *= length;

    console.log(point);
    return point;
}

function draw() {
    path.forEach((point, i) => {
        // pen.fillText(i, point.x - 10, point.y, 10);
        if (i % 4 === 0) {
            pen.moveTo(point.x, point.y);
        } else {
            pen.lineTo(point.x, point.y);
        }
    })
    pen.stroke();
}

function createHilbertCurve() {
    for (let i = 0; i < noOfPoints; i++) {
        path[i] = hilbert(i);
    }
    draw();
}

createHilbertCurve();