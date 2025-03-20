function init() {    
    const photographer = artistFilter();    
    let medialist = mediaFilter(photographer);

    directoryName();
    headerCard(photographer);
    displayGrid(medialist);
    dropdownMenu();
    initializeLightbox();
}

function directoryName() {
    const data = JSON.parse(Storage.load('photographer'));
    const photographer = new Artist(data);
    const name = photographer.name;
    let firstName = name.split(" ")[0];

    firstName = firstName.replace("-", " ");
    Storage.save('firstname', firstName);
}

function displayGrid(medialist) {
    const mediaSection = document.querySelector("#grid");
    mediaSection.innerHTML = "";

    medialist.forEach((media) => {
        let mediaType = new MediaFactory(media);
        const mediaCardDOM = mediaCard(mediaType);
        mediaSection.appendChild(mediaCardDOM);
    });
}

init();