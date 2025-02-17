function init() {    
    const photographer = artistFilter();    
    let medialist = mediaFilter(photographer);
    const mediaSection = document.querySelector("#grid");

    headerCard(photographer);
    medialist.forEach((media) => {
        let mediaType = MediaFactory(media);
        const mediaCardDOM = mediaCard(mediaType);
        mediaSection.appendChild(mediaCardDOM);
    });
}

function directoryName() {
    const name = photographer.name;
    let firstName = name.split(" ")[0];    
    firstName = firstName.replace("-", " ");
    return firstName;
}

init();