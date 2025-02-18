function mediaCard(data) {
    const firstname = Storage.load('firstname');
    let mediaData;

    if (data instanceof Image) {
        mediaData = data.picture(firstname);
    } else if (data instanceof Video) {
        mediaData = data.video(firstname);
    } else {
        throw new Error("Type de media non supporté!");
    }
    
    const article = document.createElement( 'article' );
    
    const mediaCardDOM = `
    <div class="grid-frame">
        <a href="#">
        ${data instanceof Image ? `<img src="${mediaData}" alt="${data.title}, closeup view" class="lightbox-trigger" tabindex="0" data-type="image">` : `<video src="${mediaData}" class="lightbox-trigger" tabindex="0" data-type="video"></video>`}
        </a>
    </div>
    <div class="img-info">
        <p class="title">${data.title}</p>
        <p class="likes">${data.likes} <i class="fa-solid fa-heart"></i></p>
    </div>
    `;

    article.innerHTML = mediaCardDOM;
    return (article);
}