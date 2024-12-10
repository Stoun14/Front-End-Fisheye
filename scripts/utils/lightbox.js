let count = 0;
let media = "";

const arrowLeft = document.getElementsByClassName( "lightbox-prev" )[0];
const arrowRight = document.getElementsByClassName( "lightbox-next" )[0];

const indexPrev = event => {
    event.preventDefault;
    const index = getMediaID();
    let newIndex = null;
    if (index != 0) {
        newIndex = index - 1;
    } else {
        newIndex = mediaList.length - 1;
    }
    count += 1;
    console.log("gauche");
    console.log(index);
    console.log(newIndex);
    lightboxChange(newIndex);
}

const indexNext = event => {
    event.preventDefault;
    const index = getMediaID();
    let newIndex = null;
    if (index != mediaList.length - 1) {
        newIndex = index + 1;
    } else {
        newIndex = 0;
    }
    count += 1;
    console.log("droite");
    console.log(index);
    console.log(newIndex);
    lightboxChange(newIndex);
}

function elementDisplay() {
    const id = getMediaID();
    console.log(id);
    console.log(mediaList);
    const element = mediaList[id];
    console.log(element);
    const elementType = mediaChoice(element)
    console.log(elementType);
    return elementType;
}

function displayLightbox(index) {
    const lightbox = document.getElementsByClassName( "lightbox_modal" )[0];
    const container = document.getElementsByClassName( "lightbox" )[0];    
    lightbox.style.display = 'flex';
    console.log("lightboxID = " + index);
    console.log("count = " + count);
    console.log(mediaList);
    media = mediaList[index];
    const element = elementDisplay();
    
    const lastElement = container.children[2];
    lastElement.insertAdjacentHTML("afterend", element);
    arrowLeft.addEventListener('click', indexPrev);
    arrowRight.addEventListener('click', indexNext);
    /* arrowRight.addEventListener('click', (event) => {
        nextIndex = indexNext(index);
        count += 1;
        console.log("droite");
        console.log(index);
        console.log(nextIndex);
        lightboxChange(nextIndex);
    }); */
    document.addEventListener('keyup', keyUp);    
}

const keyUp = event => {
    const code = event.key;
    if (code === "Escape") {
        closeLightbox();
    } else if (code === "ArrowLeft") {
        return indexPrev;
    } else if (code === "ArrowRight") {
        return indexNext;
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

/* function mediaChoice() {
    const id = getMediaID();
    const element = mediaList[id];
    const directory = directoryName();
    if (element == undefined) {
        return "";
    }  
    else if (element?.image == null) {
        const video = `assets/images/${directory}/${element.video}`;
        const vid =  
            `<video>
                <source src="${video}">
            </video>`;
        return vid;        
    } else if (element?.video == null) {
        const picture = `assets/images/${directory}/${element.image}`;
        const img = `<img src="${picture}"  alt=""></img>`;
        return img;
    }
} */

/* function directoryName() {
    const name = photographer.name;
    let firstName = name.split(" ")[0];    
    firstName = firstName.replace("-", " ");
    return firstName;
} */

function getMediaID() {
    let id = mediaList.findIndex(entry => entry.id === media.id);
    console.log("l'Id est:" + id );
    return id; 
}