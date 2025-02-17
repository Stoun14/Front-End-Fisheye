

function mediaCard(data) {
    // let media = ()
    const article = document.createElement( 'article' );
    
    const mediaCard = `
    <div class="grid-frame" onclick="displayLightbox(0)">
        <img src="" alt="${data.title} , closeup view">
    </div>
    <div class="img-info">
        <p class="title">${data.title}</p>
        <p class="likes">${data.likes} <i class="fa-solid fa-heart"></i></p>
    </div>
    `;

    article.innerHTML = mediaCard;
    return (article);
}