// const imageNames = [
//     '0.png',
//     '1.png',
//     '2.png',
//     '3.png',
//     '4.png'
// ];

// // Base path to your images folder
// const imageBasePath = './sketch/';

// // Function to dynamically create the gallery
// function createGallery(images) {
//     const container = document.getElementById('gallery-container');

//     // Loop through the image filenames
//     images.forEach((imageName) => {
//         // Create a div for the gallery item
//         const galleryDiv = document.createElement('div');
//         galleryDiv.classList.add('gallery');

//         // Create a link element for each image (opens in a new tab)
//         const link = document.createElement('a');
//         link.setAttribute('target', '_blank');
//         link.setAttribute('href', imageBasePath + imageName);

//         // Create an image element
//         const img = document.createElement('img');
//         img.setAttribute('src', imageBasePath + imageName);
//         img.setAttribute('alt', imageName); // Alt text can be image filename or something more descriptive

//         // Create a description div (optional text)
//         const descDiv = document.createElement('div');
//         descDiv.classList.add('desc');
//         descDiv.innerText = 'May 21'; // You can customize this

//         // Append the image and description to the link
//         link.appendChild(img);

//         // Append the link and description to the gallery div
//         galleryDiv.appendChild(link);
//         galleryDiv.appendChild(descDiv);

//         // Append the gallery div to the container
//         container.appendChild(galleryDiv);
//     });
// }

// // Call the function to create the gallery
let stacks = document.querySelectorAll(".stack");

stacks.forEach(stack => {
    // Reverse the stack so the last card is on top (for animation)
    [...stack.children].reverse().forEach(i => stack.append(i));

    stack.addEventListener("click", swap);
});

function swap(e) {
    let stack = e.currentTarget;
    let card = stack.querySelector(".card:last-child");

    // Ensure we're only triggering the animation for the topmost card (last child)
    if (e.target !== card && !card.contains(e.target)) return;

    // Apply animation to all cards in the stack
    let cards = stack.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.style.animation = "swap 700ms forwards";
    });

    // After the animation ends, reset and reorder the stack
    setTimeout(() => {
        // Reset animation for all cards
        cards.forEach(card => card.style.animation = "");

        // Move the top card to the bottom of the stack
        stack.prepend(card);
    }, 700); // Ensure this timeout matches your animation duration
}
