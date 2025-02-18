function initializeLightbox() {
    const lightbox = document.getElementById('lightbox_modal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const caption = document.getElementById('caption');
    const close = document.getElementById('lightbox-close');
    let currentIndex = 0;
    let medias = document.querySelectorAll('.lightbox-trigger');

    function displayLightbox(index) {
        const media = medias[index];
        const mediaType = media.dataset.type;

        // 
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
    }

    medias.forEach((media, index) => {
        media.addEventListener('click', function () {
            displayLightbox(index);
        });
    });

    close.addEventListener('click', function () {
        lightbox.style.display = "none";
    });

    // Lightbox Navigation
    document.getElementById('lightbox-prev').addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        displayLightbox(currentIndex);
    });

    document.getElementById('lightbox-next').addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % medias.length;
        displayLightbox(currentIndex);
    });
}
/* const arrowLeft = document.getElementsByClassName( "lightbox-prev" )[0];
const arrowRight = document.getElementsByClassName( "lightbox-next" )[0];

const indexPrev = event => {
    event.preventDefault;
    previous();
}

const indexNext = event => {
    event.preventDefault;
    next();
}

function elementDisplay() {
    const id = getMediaID();
    const element = mediaList[id];
    const elementType = mediaChoice(element);
    return elementType;
}

function displayLightbox(index) {
    const lightbox = document.getElementsByClassName( "lightbox_modal" )[0];
    const container = document.getElementsByClassName( "lightbox" )[0];    
    lightbox.style.display = 'flex';
    
    media = mediaList[index];
    const element = elementDisplay();
    
    const lastElement = container.children[2];
    lastElement.insertAdjacentHTML("afterend", element);
    arrowLeft.addEventListener('click', indexPrev);
    arrowRight.addEventListener('click', indexNext);   
    document.addEventListener('keyup', keyUp);    
}

const keyUp = event => {
    const code = event.key;
    if (code === "Escape") {
        closeLightbox();
    } else if (code === "ArrowLeft") {
        previous();
    } else if (code === "ArrowRight") {
        next();
    } 
}

function closeLightbox() {
    const lightbox = document.getElementsByClassName( "lightbox_modal" )[0];
    mediaRemove();
    lightbox.style.display = "none";
    document.removeEventListener('keyup', keyUp);
    arrowLeft.removeEventListener('click', indexPrev);
    arrowRight.removeEventListener('click', indexNext);
}

function mediaRemove() {
    const container = document.getElementsByClassName( "lightbox" )[0];
    const previousMedia = container.children[3];
    if (previousMedia != null) {
        previousMedia.remove();
    }

}

function lightboxChange(index) { 
    mediaRemove();    
    displayLightbox(index);
}

function getMediaID() {
    let id = mediaList.findIndex(entry => entry.id === media.id);
    return id; 
}

function previous() {
    const index = getMediaID();
    let newIndex = null;
    if (index != 0) {
        newIndex = index - 1;
    } else {
        newIndex = mediaList.length - 1;
    }
    count += 1;
    lightboxChange(newIndex);
}

function next() {
    const index = getMediaID();
    let newIndex = null;
    if (index != mediaList.length - 1) {
        newIndex = index + 1;
    } else {
        newIndex = 0;
    }
    count += 1;
    lightboxChange(newIndex);
} */