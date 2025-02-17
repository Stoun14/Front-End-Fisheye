function init() {    
    const photographer = artistFilter();    
    let medialist = mediaFilter(photographer);
    const mediaSection = document.querySelector("#grid");

    headerCard(photographer);
    medialist.forEach((media) => {
        let mediaType = MediaFactory(media);
        const mediaCard = medi
        mediaSection.appendChild(userCardDOM);
    });
}

init();