// src = "https://cdn.jsdelivr.net/npm/p5@1.11.5/lib/p5.js" >
//     $(document).ready(function () {
//         console.log('jQuery is working!');
//     });


// Filter patterns based on emotion
$(document).ready(function () {
    randomizePatterns(); // Randomize the patterns on page load
    attachPopupListeners(); // Attach popup listeners

    $('.pattern-box').on('mousemove', function (e) {
        const $date = $(this).find('.pattern-date');
        const offsetX = e.offsetX; // Cursor X position relative to the box
        const offsetY = e.offsetY; // Cursor Y position relative to the box

        $date.css({
            top: `${offsetY}px`,
            left: `${offsetX}px`,
            transform: 'translate(-50%, -50%)', // Center the text at the cursor
        });
    });

    $('.pattern-box').on('mouseleave', function () {
        const $date = $(this).find('.pattern-date');
        $date.css({
            color: 'solid', // Hide the text when the cursor leaves
        });
    });

    // Filter patterns based on emotion
    let originalOrder = $('.pattern-box').toArray(); // Store the original order of pattern boxes

    $('.filter-btn').on('click', function () {
        const filter = $(this).data('filter'); // Get the filter value from the button
        if (filter === 'recent') {
            // Sort patterns by most recent
            const sortedPatterns = $('.pattern-box').sort((a, b) => {
                const dateA = new Date($(a).data('date'));
                const dateB = new Date($(b).data('date'));
                return dateB - dateA; // Sort descending by date
            });
            $('.pattern-grid').html(sortedPatterns); // Reorder the grid
        } else {
            $('.pattern-box').hide(); // Hide all pattern boxes
            $(`.pattern-box .${filter}`).closest('.pattern-box').show(); // Show only boxes with the matching class
        }
    });

    // Reset button functionality
    $('.reset-btn').on('click', function () {
        $('.pattern-grid').html(originalOrder); // Restore the original order
        $('.pattern-box').show(); // Show all pattern boxes
    });
});


function attachPopupListeners() {
    $('.pattern-box img').on('click', function () {
        const thumbnailSrc = $(this).attr('src'); // e.g., ./motifs/0127/1.png

        // Replace "motifs" with "pattern" in the path
        const popupSrc = thumbnailSrc.replace('/motifs/', '/pattern/');

        // Set and show the popup
        $('#popup-image').attr('src', popupSrc);
        $('#popup').removeClass('hidden');
    });

    $('#close-popup').on('click', function () {
        $('#popup').addClass('hidden');
    });

    $('#popup').on('click', function (e) {
        if ($(e.target).is('#popup')) {
            $('#popup').addClass('hidden');
        }
    });
}





function randomizePatterns() {
    const patternGrid = $('.pattern-grid');
    const patterns = patternGrid.children('.pattern-box').toArray();

    // Shuffle the patterns array
    patterns.sort(() => Math.random() - 0.5);

    // Append the shuffled patterns back to the grid
    patternGrid.html(patterns);

    // Reattach popup event listeners
    attachPopupListeners();
}