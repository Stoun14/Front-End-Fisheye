function photographerTemplate(data) {
    const artist = new Artist(data);

    function getUserCardDOM() {
        const queryString = encodeURIComponent(JSON.stringify(data));
        const article = document.createElement( 'article' );

        const artistCard = `
        <a href="photographer.html?data=${queryString}" aria-label=${artist.name}>
            <div class="image">
                <img src="${artist.portrait}">
            </div>
            <h2>${artist.name}</h2>
        </a>
        <p class="city">${artist.city}, ${artist.country}</p>
        <p class="tagline">${artist.tagline}</p>
        <p class="price">${artist.price}€/jour</p>
        `;

        article.innerHTML = artistCard;
        return (article);
    }
    return { artist, getUserCardDOM };
}