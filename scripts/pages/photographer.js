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
}

function directoryName() {
    const data = JSON.parse(Storage.load('photographer'));
    console.log(data);
    const photographer = new Artist(data);
    console.log(photographer);
    const name = photographer.name;
    let firstName = name.split(" ")[0];    
    firstName = firstName.replace("-", " ");
    Storage.save('firstname', firstName);
}

init();