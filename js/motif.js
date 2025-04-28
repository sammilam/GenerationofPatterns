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

stacks.forEach(stack => {
    const cards = stack.querySelectorAll('.card');
    const total = cards.length;

    // Add page numbers to each card
    cards.forEach((card, index) => {
        let pageNumber = document.createElement('span');
        pageNumber.className = 'page-number';
        pageNumber.textContent = `${index + 1} / ${total}`;
        card.appendChild(pageNumber);
    });

    // Reverse stack
    [...cards].reverse().forEach(i => stack.append(i));

    stack.addEventListener("click", swap);
});

