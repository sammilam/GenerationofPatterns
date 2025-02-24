// CREDIT TO: https://editor.p5js.org/PaulLiu/sketches/iHD0JPlDN FOR DRAWING BOARD!
const drawCanvas = document.getElementById("drawCanvas");
const drawCtx = drawCanvas.getContext("2d");
drawCanvas.width = 300;
drawCanvas.height = 300;
let drawing = false;
let lastX = 0;
let lastY = 0;

drawCtx.lineWidth = 3;
drawCtx.lineCap = "round";
drawCtx.strokeStyle = "black";

drawCanvas.addEventListener("mousedown", (event) => {
    drawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
});
drawCanvas.addEventListener("mouseup", () => drawing = false);
drawCanvas.addEventListener("mousemove", draw);

function draw(event) {
    if (!drawing) return;
    drawCtx.beginPath();
    drawCtx.moveTo(lastX, lastY);
    drawCtx.lineTo(event.offsetX, event.offsetY);
    drawCtx.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
    updatePattern();
}

// copies the pattern and repeats across the screen
function updatePattern() {
    const patternCanvas = document.getElementById("patternCanvas");
    const patternCtx = patternCanvas.getContext("2d");
    patternCanvas.width = window.innerWidth;
    patternCanvas.height = window.innerHeight;
    const pattern = drawCtx.getImageData(0, 0, drawCanvas.width, drawCanvas.height);
    const cols = Math.floor(patternCanvas.width / drawCanvas.width) + 1;
    const rows = Math.floor(patternCanvas.height / drawCanvas.height) + 2;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            patternCtx.putImageData(pattern, i * drawCanvas.width, j * drawCanvas.height);
        }
    }
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        updatePattern();
    }
});

