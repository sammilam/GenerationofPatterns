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
function takeScreenshot() {
    const filename = prompt("Enter a name for your screenshot file:", "pattern-screenshot");
  
    if (filename) {
      // Ask user for resolution multiplier
      const resolutionInput = prompt("Enter the resolution multiplier (e.g., 2 for 2x, 4 for 4x):", "4");
  
      // Ensure the input is a number and has a default fallback if empty
      const resolutionMultiplier = parseInt(resolutionInput) || 4; // Default to 4 if input is invalid
  
      // Get the current zoomed canvas size (considering any scaling/zooming done on the main canvas)
      const zoomedWidth = canvas.width * resolutionMultiplier;
      const zoomedHeight = canvas.height * resolutionMultiplier;
  
      // Create an offscreen canvas with higher resolution
      const exportCanvas = document.createElement('canvas');
      const exportCtx = exportCanvas.getContext('2d');
  
      // Set the resolution of the export canvas
      exportCanvas.width = zoomedWidth;
      exportCanvas.height = zoomedHeight;
  
      // Disable image smoothing for sharper edges
      exportCtx.imageSmoothingEnabled = false;
  
      // Apply the same transformations (scale) to the export context
      exportCtx.setTransform(resolutionMultiplier, 0, 0, resolutionMultiplier, 0, 0);
  
      // Redraw the pattern onto the high-res export canvas
      if (img) {
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d');
        
        patternCanvas.width = imgSize;
        patternCanvas.height = imgSize;
        patternCtx.drawImage(img, 0, 0, imgSize, imgSize);
  
        const pattern = exportCtx.createPattern(patternCanvas, 'repeat');
        exportCtx.fillStyle = pattern;
        exportCtx.fillRect(0, 0, zoomedWidth, zoomedHeight);
      }
  
      // Create a downloadable link for the high-resolution export
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
  
      alert(`Screenshot saved as "${filename}.png" with resolution multiplier ${resolutionMultiplier}!`);
    } else {
      alert("Screenshot canceled.");
    }
  }
  


// Disable image smoothing for sharper image rendering

  

// function takeSVGExport() {
//     const filename = prompt("Enter a name for your SVG file:", "pattern");

//     if (filename) {
//         // Create SVG string
//         let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">`;

//         // Add the pattern
//         if (img) {
//             const patternWidth = imgSize;
//             const patternHeight = imgSize;
//             svgContent += `<pattern id="pattern1" patternUnits="userSpaceOnUse" width="${patternWidth}" height="${patternHeight}">
//                           <image href="${img.src}" width="${patternWidth}" height="${patternHeight}" />
//                         </pattern>`;

//             svgContent += `<rect width="100%" height="100%" fill="url(#pattern1)" />`;
//         }

//         svgContent += `</svg>`;

//         // Create an invisible link to download the SVG
//         const link = document.createElement('a');
//         link.download = `${filename}.svg`;
//         link.href = 'data:image/svg+xml;base64,' + btoa(svgContent); // Encoding the SVG string
//         link.click();

//         // Confirmation message
//         alert(`SVG screenshot saved as "${filename}.svg"!`);
//     } else {
//         alert("Screenshot canceled.");
//     }
// }

