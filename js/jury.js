let playing = false;
let video;
let button;

function setup() {
    noCanvas();

    // Load video
    video = createVideo(['/video/fingers.mov', './video/demo.MOV'], () => {
        console.log('Video loaded successfully');
    });

    // Set video size and position
    video.size(1000, 1000); // Adjust the size of the video
    video.position(windowWidth / 4, 100); // Position the video on the screen

    // Add a mousePressed event to the video to toggle play/pause
    video.mousePressed(toggleVid);

    // Add cursor styling to the video
    video.style('cursor', 'pointer'); // Change cursor to hand when hovering over the video

    // Create play/pause button
    button = createButton('play');
    button.mousePressed(toggleVid);

    // Add cursor styling to the button
    button.style('cursor', 'pointer'); // Change cursor to hand when hovering over the button

    // Position the button right beside the video
    button.position(video.x + video.width + 10, video.y + (video.height / 2) - 15); // Adjust for alignment
}

function toggleVid() {
    if (playing) {
        video.pause();
        button.html('play');
    } else {
        video.loop();
        button.html('pause');
    }
    playing = !playing; // Toggle the playing state
}
