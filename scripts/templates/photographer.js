function photographerTemplate(data) {
    const { id, name, city, country, portrait, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.setAttribute("href", "photographer.html#"+id);
        article.appendChild(link);
        const div = document.createElement( 'div' );
        div.setAttribute("class", "image");
        link.appendChild(div);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        div.appendChild(img);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;        
        link.appendChild(h2);
        const location = document.createElement( 'p' );
        location.setAttribute("class", "city");
        location.textContent = city+", "+country;
        article.appendChild(location);
        const slogan = document.createElement( 'p' );
        slogan.setAttribute("class", "tagline");
        slogan.textContent = tagline;
        article.appendChild(slogan);
        const cost = document.createElement( 'p' );
        cost.setAttribute("class", "price");
        cost.textContent = price+"€/jour";
        article.appendChild(cost);
        return (article);
    }
    return { name, city, country, portrait, price, tagline, getUserCardDOM }
}