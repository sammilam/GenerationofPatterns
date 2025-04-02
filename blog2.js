// Sync blog container scroll with minimap viewport
document.getElementById('blogContainer').addEventListener('scroll', () => {
    let container = document.getElementById('blogContainer');
    let viewport = document.getElementById('minimap-viewport');
    let scale = container.scrollTop / (container.scrollHeight - container.clientHeight);

    viewport.style.top = `${scale * (100 - viewport.clientHeight / 2)}%`;
});

// Dates array for blog posts
const dates = [
    "001", "002", "003", "004", "005", "006", "007", "008", "009", "010",
    "011", "012", "013", "014", "015", "016", "017", "018", "019", "020",
    "021", "022", "023", "024", "025", "026", "027", "028", "029", "030",
    "031", "032", "033", "034", "035", "036", "037", "038", "039"
];

// Insert generated date HTML into the contents div
const contents = document.getElementById('contents');
contents.innerHTML += dates.map((date, index) =>
    `<div class="bar" onclick="scrollToPost(${index})">
        <h2>${date}</h2>
    </div>`).join('');

// Scroll to post function
function scrollToPost(index) {
    console.log(`Scrolling to post ${index}`);
    const posts = document.querySelectorAll('.post');
    if (posts[index]) {
        posts[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Minimap scrolling logic
const blogContainer = document.getElementById('blogContainer');
const viewport = document.getElementById('minimap-viewport');
const minimap = document.getElementById('minimap');

let isDragging = false;
let startY, startTop;

// Sync minimap with blog container scrolling
blogContainer.addEventListener('scroll', () => {
    if (!isDragging) {
        let scale = blogContainer.scrollTop / (blogContainer.scrollHeight - blogContainer.clientHeight);
        viewport.style.top = `${scale * (minimap.clientHeight - viewport.clientHeight)}px`;
    }
});

// Enable minimap viewport dragging
viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startTop = viewport.offsetTop;
    viewport.style.transition = 'none';  // Disable transition while dragging
});

// Handle dragging movement
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    let deltaY = e.clientY - startY;
    let newTop = startTop + deltaY;

    // Constrain viewport within minimap
    newTop = Math.max(0, Math.min(newTop, minimap.clientHeight - viewport.clientHeight));
    viewport.style.top = `${newTop}px`;

    // Sync blog container scroll with minimap dragging
    let scale = newTop / (minimap.clientHeight - viewport.clientHeight);
    blogContainer.scrollTop = scale * (blogContainer.scrollHeight - blogContainer.clientHeight);
});

// Stop dragging when mouse is released
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        viewport.style.transition = 'top 0.3s';  // Re-enable transition after dragging
    }
});

// Hovering image effect
// Get all elements with the class 'hoverImage'


document.addEventListener("DOMContentLoaded", () => {
    const mainImages = document.querySelectorAll(".mainImage");  // All main images
    const hoverImages = document.querySelectorAll(".hover-image"); // All hover images

    // Preload hover images
    const preloadImages = () => {
        hoverImages.forEach((hoverImage, index) => {
            const img = new Image();
            img.src = `sketch/${index}.png`; // Preload hover images (adjusted for index)
        });
    };

    // Call preload function
    preloadImages();


    mainImages.forEach((mainImage, index) => {
        const hoverImage = hoverImages[index];  // Get corresponding hover image

        // Set the source of the hover image based on the index and folder path
        hoverImage.src = `sketch/${index}.png`;

        // When mouse moves over the main image
        mainImage.addEventListener("mousemove", (e) => {
            const rect = mainImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            hoverImage.style.display = "block";
            hoverImage.style.width = "200px";  // Adjust size
            hoverImage.style.height = "200px"; // Adjust size

            // Set hover image position relative to cursor, centered
            hoverImage.style.left = `${x + 150}px`;
            hoverImage.style.top = `${y + 150}px`;
        });

        // Hide hover image when mouse leaves the main image
        mainImage.addEventListener("mouseleave", () => {
            hoverImage.style.display = "none";
        });
    });
});
