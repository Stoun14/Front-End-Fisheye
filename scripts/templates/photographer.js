function photographerTemplate(data, index) {
    let artist = new Artist(data);

    function getUserCardDOM() {
        const queryString = encodeURIComponent(JSON.stringify(artist));
        const article = document.createElement( 'article' );

        const artistCard = `
        <a href="photographer.html?data=${queryString}">
            <div class="image">
                <img src="${artist.portrait}">
            </div>
            <h2>${artist._name}</h2>
        </a>
        <p class="city">${artist._city}, ${artist._country}</p>
        <p class="tagline">${artist._tagline}</p>
        <p class="price">${artist._price}€/jour</p>
        `

        article.innerHTML = artistCard;
        return (article);
    }
    return { artist, getUserCardDOM };
}