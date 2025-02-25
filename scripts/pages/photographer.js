function init() {    
    const photographer = artistFilter();    
    let medialist = mediaFilter(photographer);
    const mediaSection = document.querySelector("#grid");

    directoryName();
    headerCard(photographer);

    medialist.forEach((media) => {
        let mediaType = new MediaFactory(media);
        const mediaCardDOM = mediaCard(mediaType);
        mediaSection.appendChild(mediaCardDOM);
    });

    hearts();
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

init();