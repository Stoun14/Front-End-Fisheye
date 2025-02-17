

function mediaCard(data) {
    const firstname = ;
    let mediaData = (data instanceof Image) ? 
    const article = document.createElement( 'article' );
    
    const mediaCardDOM = `
    <div class="grid-frame" onclick="displayLightbox(0)">
        <img src="${mediaData}" alt="${data.title} , closeup view">
    </div>
    <div class="img-info">
        <p class="title">${data.title}</p>
        <p class="likes">${data.likes} <i class="fa-solid fa-heart"></i></p>
    </div>
    `;

    article.innerHTML = mediaCardDOM;
    return (article);
}