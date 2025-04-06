// // CREDIT TO: https://editor.p5js.org/PaulLiu/sketches/iHD0JPlDN FOR DRAWING BOARD!
// const drawCanvas = document.getElementById("drawCanvas");
// const drawCtx = drawCanvas.getContext("2d");
// drawCanvas.width = 300;
// drawCanvas.height = 300;
// let drawing = false;
// let lastX = 0;
// let lastY = 0;

// drawCtx.lineWidth = 3;
// drawCtx.lineCap = "round";
// drawCtx.strokeStyle = "black";

// drawCanvas.addEventListener("mousedown", (event) => {
//     drawing = true;
//     [lastX, lastY] = [event.offsetX, event.offsetY];
// });
// drawCanvas.addEventListener("mouseup", () => drawing = false);
// drawCanvas.addEventListener("mousemove", draw);

// function draw(event) {
//     if (!drawing) return;
//     drawCtx.beginPath();
//     drawCtx.moveTo(lastX, lastY);
//     drawCtx.lineTo(event.offsetX, event.offsetY);
//     drawCtx.stroke();
//     [lastX, lastY] = [event.offsetX, event.offsetY];
//     updatePattern();
// }

// // copies the pattern and repeats across the screen
// function updatePattern() {
//     const patternCanvas = document.getElementById("patternCanvas");
//     const patternCtx = patternCanvas.getContext("2d");
//     patternCanvas.width = window.innerWidth;
//     patternCanvas.height = window.innerHeight;
//     const pattern = drawCtx.getImageData(0, 0, drawCanvas.width, drawCanvas.height);
//     const cols = Math.floor(patternCanvas.width / drawCanvas.width) + 1;
//     const rows = Math.floor(patternCanvas.height / drawCanvas.height) + 2;

//     for (let i = 0; i < cols; i++) {
//         for (let j = 0; j < rows; j++) {
//             patternCtx.putImageData(pattern, i * drawCanvas.width, j * drawCanvas.height);
//         }
//     }
// }

// document.addEventListener("keydown", (event) => {
//     if (event.code === "Space") {
//         drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
//         updatePattern();
//     }
// });

const drawCanvas = document.getElementById("drawCanvas");
const drawCtx = drawCanvas.getContext("2d");
drawCanvas.width = 300;
drawCanvas.height = 300;

const patternCanvas = document.getElementById("patternCanvas");
const patternCtx = patternCanvas.getContext("2d");

let drawing = false;
let lastX = 0;
let lastY = 0;

drawCtx.lineWidth = 3;
drawCtx.lineCap = "round";
drawCtx.strokeStyle = "black";

// Pattern state
let scale = 1;
const minScale = 0.2;
const maxScale = 5;

// Resize canvas to window
function resizePatternCanvas() {
    patternCanvas.width = window.innerWidth;
    patternCanvas.height = window.innerHeight;
}
window.addEventListener("resize", () => {
    resizePatternCanvas();
    updatePattern();
});
resizePatternCanvas();

// Create offscreen buffer for drawing pattern
const patternImage = document.createElement("canvas");
patternImage.width = drawCanvas.width;
patternImage.height = drawCanvas.height;
const patternImageCtx = patternImage.getContext("2d");

drawCanvas.addEventListener("mousedown", (event) => {
    drawing = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
});

drawCanvas.addEventListener("mouseup", () => {
    drawing = false;
});

drawCanvas.addEventListener("mousemove", (event) => {
    if (!drawing) return;
    drawCtx.beginPath();
    drawCtx.moveTo(lastX, lastY);
    drawCtx.lineTo(event.offsetX, event.offsetY);
    drawCtx.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
    updatePattern();
});

// Zoom with mouse wheel
patternCanvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    const zoomAmount = -event.deltaY * 0.001;
    scale += zoomAmount;
    scale = Math.max(minScale, Math.min(maxScale, scale));
    updatePattern();
}, { passive: false });

// Clear the drawing canvas on spacebar
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        updatePattern();
    }
});

function updatePattern() {
    // Copy current drawing to the offscreen pattern image
    patternImageCtx.clearRect(0, 0, patternImage.width, patternImage.height);
    patternImageCtx.drawImage(drawCanvas, 0, 0);

    patternCtx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);

    const tileWidth = drawCanvas.width * scale;
    const tileHeight = drawCanvas.height * scale;

    const cols = Math.ceil(patternCanvas.width / tileWidth) + 1;
    const rows = Math.ceil(patternCanvas.height / tileHeight) + 1;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            patternCtx.drawImage(
                patternImage,
                0, 0, drawCanvas.width, drawCanvas.height,
                i * tileWidth, j * tileHeight,
                tileWidth, tileHeight
            );
        }
    }
}

// Initial pattern render
updatePattern();

//button to save the png 
function saveMotifAsImage() {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = drawCanvas.width;
    tempCanvas.height = drawCanvas.height;

    // Draw white background first
    tempCtx.fillStyle = "white";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the actual drawing on top
    tempCtx.drawImage(drawCanvas, 0, 0);

    const link = document.createElement("a");
    link.download = "motif.png";
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
}
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        updatePattern();
    }

    if (event.key.toLowerCase() === 's') {
        saveMotifAsImage();
    }
});

document.getElementById("save-button").addEventListener("click", saveMotifAsImage);
