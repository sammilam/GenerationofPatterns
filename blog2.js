
// to have a blog container and minimap scroll together
// Select the new div for content
// to have a blog container and minimap scroll together
document.getElementById('blog-container').addEventListener('scroll', () => {
    let container = document.getElementById('blog-container');
    let viewport = document.getElementById('minimap-viewport');
    let scale = container.scrollTop / (container.scrollHeight - container.clientHeight);
    viewport.style.top = `${scale * (100 - viewport.clientHeight / 2)}%`;
});

const dates = [
    "001", "002", "003", "004", "005", "006", "007", "008", "009", "010",
    "011", "012", "013", "014", "015", "016", "017", "018", "019", "020",
    "021", "022", "023", "024", "025", "026", "027", "028", "029", "030",
    "031", "032", "033", "034", "035", "036", "037", "038", "039"
];

// Use the #contents div now instead of #customization-panel
const contents = document.getElementById('contents');

// Create the HTML string for the dates
let html = dates.map((date, index) =>
    `<div class="bar" onclick="scrollToPost(${index})">
        <h2>${date}</h2>
    </div>`
).join('');

// Insert the generated HTML into the contents div
contents.innerHTML += html;

function scrollToPost(index) {
    console.log(`Scrolling to post ${index}`);
    const posts = document.querySelectorAll('.post');
    if (posts[index]) {
        posts[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


const blogContainer = document.getElementById('blog-container');
const viewport = document.getElementById('minimap-viewport');
const minimap = document.getElementById('minimap');

let isDragging = false;
let startY, startTop;

// ✅ Scroll sync logic
blogContainer.addEventListener('scroll', () => {
    if (!isDragging) {
        let scale = blogContainer.scrollTop / (blogContainer.scrollHeight - blogContainer.clientHeight);
        viewport.style.top = `${scale * (minimap.clientHeight - viewport.clientHeight)}px`;
    }
});

// ✅ Mouse events for dragging
viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startTop = viewport.offsetTop;
    viewport.style.transition = 'none';  // Disable smooth transition during dragging
});

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    let deltaY = e.clientY - startY;
    let newTop = startTop + deltaY;

    // Constrain the viewport inside the minimap
    newTop = Math.max(0, Math.min(newTop, minimap.clientHeight - viewport.clientHeight));

    viewport.style.top = `${newTop}px`;

    // Sync blog container scroll with minimap dragging
    let scale = newTop / (minimap.clientHeight - viewport.clientHeight);
    blogContainer.scrollTop = scale * (blogContainer.scrollHeight - blogContainer.clientHeight);
});

// Stop dragging when releasing the mouse
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        viewport.style.transition = 'top 0.3s';  // Re-enable smooth transition after dragging
    }
});
