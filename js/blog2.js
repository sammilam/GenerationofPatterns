fetch('get-images-script.php')
    .then(response => response.json())
    .then(data => {
        console.log('Loaded files:', data);
    })
    .catch(error => {
        console.error('Error loading files:', error);
    });



src = "https://cdn.jsdelivr.net/npm/p5@1.11.5/lib/p5.js" >
    $(document).ready(function () {
        console.log('jQuery is working!');

        // Sync blog container scroll with minimap viewport
        $('#blogContainer').on('scroll', function () {
            const container = $(this);
            const scale = container.scrollTop() / (container[0].scrollHeight - container.height());
            $('#minimap-viewport').css('top', `${scale * ($('#minimap').height() - $('#minimap-viewport').height())}px`);
        });

        // Generate date bars dynamically
        const dates = Array.from({ length: 94 }, (_, i) => i + 1); // Generate dates 1 to 94
        $('#contents').append(
            dates.map((date, index) =>
                `<div class="bar" data-index="${index}">
                    <h2>${date}</h2>
                </div>`
            ).join('')
        );

        // Scroll to post on bar click
        $('#contents').on('click', '.bar', function () {
            const index = $(this).data('index');
            const post = $('.post').eq(index);
            if (post.length) {
                post[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        // Minimap dragging logic
        let isDragging = false, startY, startTop;

        $('#minimap-viewport').on('mousedown', function (e) {
            isDragging = true;
            startY = e.clientY;
            startTop = $(this).position().top;
            $(this).css('transition', 'none');
        });

        $(document).on('mousemove', function (e) {
            if (!isDragging) return;

            const deltaY = e.clientY - startY;
            const newTop = Math.max(0, Math.min(startTop + deltaY, $('#minimap').height() - $('#minimap-viewport').height()));
            $('#minimap-viewport').css('top', `${newTop}px`);

            const scale = newTop / ($('#minimap').height() - $('#minimap-viewport').height());
            $('#blogContainer').scrollTop(scale * ($('#blogContainer')[0].scrollHeight - $('#blogContainer').height()));
        });

        $(document).on('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                $('#minimap-viewport').css('transition', 'top 0.3s');
            }
        });

        // Hover image effect
        const preloadImages = () => {
            $('.hover-image').each(function (index) {
                $('<img>').attr('src', `sketch/${index}.png`);
            });
        };

        preloadImages();

        $('.mainImage').each(function (index) {
            const mainImage = $(this);
            const hoverImage = $('.hover-image').eq(index).attr('src', `sketch/${index}.png`);

            mainImage.on('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                hoverImage.css({
                    display: 'block',
                    width: '200px',
                    height: '200px',
                    left: `${x + 150}px`,
                    top: `${y + 150}px`
                });
            });

            mainImage.on('mouseleave', function () {
                hoverImage.css('display', 'none');
            });
        });
    });
