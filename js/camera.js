let video;
let capturedImage;

function setup() {
    // Create a full-screen canvas
    createCanvas(windowWidth, windowHeight);

    // Initialize the video capture without audio
    video = createCapture({
        video: true,
        audio: false, // Disable audio
    });
    video.size(640, 480);
    video.hide();

    // Connect the HTML button to the captureSnapshot function
    const snapshotButton = document.getElementById('snapshotButton');
    snapshotButton.addEventListener('click', captureSnapshot);
}

function draw() {
    background(255);

    // Display the video feed
    image(video, (width - video.width) / 2, (height - video.height) / 2);

    // Display the captured image if available
    if (capturedImage) {
        image(capturedImage, (width - capturedImage.width) / 2, (height - capturedImage.height) / 2);
    }
}

function captureSnapshot() {
    // Capture the current frame from the video feed
    capturedImage = get();

    // Convert the captured image to a base64 string
    const imageData = capturedImage.canvas.toDataURL('image/png');

    // Send the image data to the PHP script
    fetch('save_image.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
    })
        .then(response => response.text())
        .then(data => {
            console.log('Image saved:', data);
        })
        .catch(error => {
            console.error('Error saving image:', error);
        });
}