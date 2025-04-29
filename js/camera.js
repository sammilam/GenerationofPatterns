let video;
let snapshots = [];
let counter = 0;
let total;
let isCapturing = true; // Flag to control capturing

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);

    // Initialize the video capture
    video = createCapture(VIDEO);
    video.size(100, 100);
    video.hide();

    // Create a button for capturing the snapshot
    const button = select('#snapshotButton');
    button.mousePressed(captureSnapshot);
}

function draw() {
    if (!isCapturing) return; // Stop updating the grid if capturing is disabled

    let w = windowWidth / 8; // Width of each snapshot cell
    let h = windowHeight / 4; // Height of each snapshot cell
    let x = 0; // Starting x position
    let y = 0; // Starting y position

    // Calculate how many cells fit in the canvas
    total = floor(windowWidth / w) * floor(windowHeight / h);

    // Capture the current frame from the video feed
    snapshots[counter] = video.get();
    counter++;
    if (counter == total) {
        counter = 0; // Reset the counter when it reaches the total
    }

    // Display the snapshots in a grid
    for (let i = 0; i < snapshots.length; i++) {
        let index = (i + frameCount) % snapshots.length; // Cycle through snapshots
        image(snapshots[index], x, y, w, h); // Draw the snapshot at the current grid position
        x = x + w; // Move to the next column
        if (x >= width) {
            x = 0; // Reset to the first column
            y = y + h; // Move to the next row
        }
    }
}

function captureSnapshot() {
    // Stop capturing and freeze the current frame
    isCapturing = false;

    // Capture the current canvas as an image
    const canvasImage = canvas.toDataURL('image/png');

    // Save the image locally
    saveCanvas('snapshot', 'png'); // Save the canvas as a PNG file named "snapshot.png"

    // Send the image data to the PHP script
    fetch('save_image.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: canvasImage }),
    })
        .then(response => response.text())
        .then(data => {
            console.log('Canvas image saved on server:', data);
            alert('Image saved successfully on the server!');
            isCapturing = true; // Resume capturing after saving
        })
        .catch(error => {
            console.error('Error saving canvas image on server:', error);
            isCapturing = true; // Resume capturing even if there's an error
        });
}

// ref : https://www.youtube.com/watch?v=oLiaUEKsRws&ab_channel=TheCodingTrain
