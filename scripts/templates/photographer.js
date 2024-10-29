function photographerTemplate(data) {
    const { name, city, portrait, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.setAttribute("href", "");
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
        const place = document.createElement( 'p' );
        div.setAttribute("class", "city");
        place.textContent = city;
        article.appendChild(place);
        const slogan = document.createElement( 'p' );
        slogan.setAttribute("class", "tagline");
        slogan.textContent = tagline;
        article.appendChild(slogan);
        const cost = document.createElement( 'p' );
        cost.setAttribute("class", "price");
        cost.textContent = price;
        article.appendChild(cost);
        return (article);
    }
    return { name, city, portrait, price, tagline, getUserCardDOM }
}