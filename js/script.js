const dropZone = document.getElementById('drop-zone');
const canvas = document.getElementById('pattern-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let img = null; // Holds the uploaded image
let imgSize = 100; // Initial size of the image

// Drag and Drop functionality
dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.style.borderColor = 'blue';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = '#ccc';
});


// when dropping the image
dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            img = new Image();
            img.src = reader.result;
            img.onload = drawPattern;
        };
        reader.readAsDataURL(file);
    }
    dropZone.style.borderColor = '#ccc';
});

// Scroll event to resize image
window.addEventListener('wheel', (event) => {
    if (!img) return; // Do nothing if no image is uploaded

    // Adjust image size based on scroll direction
    const scaleAmount = 10;
    if (event.deltaY < 0) {
        imgSize += scaleAmount; // Scroll up: Increase size
    } else {
        imgSize = Math.max(scaleAmount, imgSize - scaleAmount); // Scroll down: Decrease size (minimum size: 10px)
    }

    drawPattern();
});

// Key event for screenshot
window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 's') {
        takeScreenshot();
    }
});

// Draw the pattern
function drawPattern() {
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    const patternCanvas = document.createElement('canvas');
    const patternCtx = patternCanvas.getContext('2d');

    // Set the pattern canvas size to the adjusted image size
    patternCanvas.width = imgSize;
    patternCanvas.height = imgSize;

    // Draw the image onto the pattern canvas
    patternCtx.drawImage(img, 0, 0, imgSize, imgSize);

    // Create the pattern and fill the main canvas
    const pattern = ctx.createPattern(patternCanvas, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// uses button to save the pattern
function saveWithButton() {
    const filename = prompt("Enter a name for your file:", "pattern");

    if (!filename) {
        alert("Save canceled.");
        return;
    }

    const resolutionMultiplier = 9; // fixed multiplier

    const zoomedWidth = canvas.width * resolutionMultiplier;
    const zoomedHeight = canvas.height * resolutionMultiplier;

    const exportCanvas = document.createElement('canvas');
    const exportCtx = exportCanvas.getContext('2d');

    exportCanvas.width = zoomedWidth;
    exportCanvas.height = zoomedHeight;

    // White background
    exportCtx.fillStyle = "white";
    exportCtx.fillRect(0, 0, zoomedWidth, zoomedHeight);

    exportCtx.imageSmoothingEnabled = false;
    exportCtx.setTransform(resolutionMultiplier, 0, 0, resolutionMultiplier, 0, 0);

    if (img) {
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d');

        patternCanvas.width = imgSize;
        patternCanvas.height = imgSize;
        patternCtx.drawImage(img, 0, 0, imgSize, imgSize);

        const pattern = exportCtx.createPattern(patternCanvas, 'repeat');
        exportCtx.fillStyle = pattern;
        exportCtx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
}

document.getElementById("save-button").addEventListener("click", saveWithButton);

window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "s") {
        saveWithButton();
    }
});
