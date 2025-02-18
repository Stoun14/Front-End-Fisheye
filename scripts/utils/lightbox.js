function initializeLightbox() {
    const lightbox = document.getElementById('lightbox_modal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const caption = document.getElementById('caption');
    const close = document.getElementById('lightbox-close');
    let currentIndex = 0;
    let medias = document.querySelectorAll('.lightbox-trigger');
    const links = document.querySelectorAll('a'); 

    function displayLightbox(index) {
        const media = medias[index];
        const mediaType = media.dataset.type;

        lightboxImage.style.display = "none";
        lightboxVideo.style.display = "none";

        if (mediaType === 'image') {
            lightboxImage.src = media.src;
            lightboxImage.style.display = "flex";
            caption.innerHTML = media.alt;
        } else if (mediaType === 'video') {
            lightboxVideo.src = media.src;
            lightboxVideo.style.display = "flex";
            caption.innerHTML = media.alt;
        }

        lightbox.style.display = "flex";
        currentIndex = index;
        document.addEventListener('keyup', keyUp); 
    }

    const keyUp = event => {
        switch (event.key) {
            case "Escape":
                close.click();
                break;
            case "ArrowLeft":
                currentIndex = (currentIndex - 1 + medias.length) % medias.length;
                displayLightbox(currentIndex);
                break;
            case "ArrowRight":
                currentIndex = (currentIndex + 1) % medias.length;
                displayLightbox(currentIndex);
                break;
        }
    }

    medias.forEach((media, index) => {
        media.addEventListener('click', function () {
            displayLightbox(index);
        });
    });

    links.forEach((link, index) => {
        link.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                displayLightbox(index);
            }
        });
    });

    close.addEventListener('click', function () {
        lightbox.style.display = "none";
    });

    document.getElementById('lightbox-prev').addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        displayLightbox(currentIndex);
    });

    document.getElementById('lightbox-next').addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % medias.length;
        displayLightbox(currentIndex);
    });
}