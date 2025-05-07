$(document).ready(function () {
    const $dropZone = $('#drop-zone');
    const $canvas = $('#pattern-canvas');
    const ctx = $canvas[0].getContext('2d');

    $canvas[0].width = window.innerWidth;
    $canvas[0].height = window.innerHeight;

    let img = null; // Holds the uploaded image
    let imgSize = 100; // Starting tile size in pixels (adjust as needed)

    // Drag and Drop functionality
    $dropZone.on('dragover', (e) => {
        e.preventDefault();
        $dropZone.addClass('dragover'); // Add a class to style the drop zone
    });

    $dropZone.on('dragleave', () => {
        $dropZone.removeClass('dragover'); // Remove the class when dragging leaves
    });

    $dropZone.on('drop', (e) => {
        e.preventDefault();
        $dropZone.removeClass('dragover'); // Remove the class when the image is dropped

        const file = e.originalEvent.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                img = new Image();
                img.src = reader.result;
                img.onload = drawPattern;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please drop a valid image file.');
        }
    });

    // Scroll event to resize image
    $(window).on('wheel', (e) => {
        if (!img) return; // Do nothing if no image is loaded

        const scaleAmount = 10; // Amount to scale the image per scroll
        if (e.originalEvent.deltaY < 0) {
            // Scrolling up: Increase size
            imgSize += scaleAmount;
        } else {
            // Scrolling down: Decrease size, but ensure it doesn't go below a minimum size
            imgSize = Math.max(10, Math.min(1000, imgSize - scaleAmount));
        }

        drawPattern(); // Redraw the pattern with the updated size
    });

    // Key event for screenshot
    $(window).on('keydown', (e) => {
        if (e.key.toLowerCase() === 's') {
            saveWithButton();
        }
    });

    // Draw the pattern
    function drawPattern() {
        if (!img) return;

        ctx.clearRect(0, 0, $canvas[0].width, $canvas[0].height); // Clear canvas
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d');

        // Set the pattern canvas size to the adjusted image size
        patternCanvas.width = img.width;
        patternCanvas.height = img.height;

        // Draw the image onto the pattern canvas
        patternCanvas.width = imgSize;
        patternCanvas.height = imgSize;
        patternCtx.drawImage(img, 0, 0, imgSize, imgSize);

        // Create the pattern and fill the main canvas
        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, $canvas[0].width, $canvas[0].height);
    }

    // uses button to save the pattern
    function saveWithButton() {
        const filename = prompt("Enter a name for your file:", "pattern");

        if (!filename) {
            alert("Save canceled.");
            return;
        }

        const resolutionMultiplier = 7; // fixed multiplier

        const zoomedWidth = $canvas[0].width * resolutionMultiplier;
        const zoomedHeight = $canvas[0].height * resolutionMultiplier;

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
            exportCtx.fillRect(0, 0, $canvas[0].width, $canvas[0].height);
        }

        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = exportCanvas.toDataURL('image/png');
        link.click();
    }


});
