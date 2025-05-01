// Global variables
let playing = false;
let video;
let button;

function setup() {
    // Remove the canvas
    noCanvas();

    // Create and style the video
    video = createVideo(['./video/web.mp4'], () => {
        console.log('Video loaded successfully');
        video.volume(0); // Mute the video
        video.loop(); // Start looping the video
        video.play(); // Play the video
    });
    styleVideo();

    // Add a mousePressed event to toggle play/pause
    video.mousePressed(toggleVid);

    // Create and style the play/pause button
    button = createButton('play');
    button.mousePressed(toggleVid);
}

function styleVideo() {
    video.size(1280, 720); // Set video size
    video.position(0, 0); // Set video position
    video.style('z-index', '-1'); // Send video to the background
    video.style('position', 'absolute'); // Absolute positioning
    video.style('top', '15%'); // Center vertically
    video.style('left', '25%'); // Center horizontally
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