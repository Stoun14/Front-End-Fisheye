async function autorun() {
    //récupération de l'id du photographe dans le lien
    const id = window.location.hash.substring(1);
    // Récupération des données des photographes du fichier json
    const { photographers } = await getPhotographers();
    const photographer = photographers.find(entry => entry.id == id);
    // Stockage des données du photographe dans le localStorage
    dataStorage(photographer);
    getCardDOM();
    getPortfolio(id);
}

async function getPhotographers() {
    // Récupération des données du fichier json
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    // renvoi du tableau des photographes obtenu
    return data
}

function dataStorage(data) {
    window.localStorage.setItem("name", data.name);
    //const name = window.localStorage.getItem("name");
    window.localStorage.setItem("city", data.city);
    window.localStorage.setItem("country", data.country);
    window.localStorage.setItem("tagline", data.tagline);
    window.localStorage.setItem("portrait", data.portrait);    
}

function getData(varName) {
    varName = window.localStorage.getItem(varName);
    return varName;
}

function getCardDOM() {
    const name = getData("name");
    const photographerName = document.getElementById("name");
    photographerName.innerText = name;
    const city = getData("city");
    const country = getData("country");
    const location = document.getElementById("location");
    location.innerText = city+", "+country;
    const tagline = getData("tagline");
    const slogan = document.getElementById("tagline");
    slogan.innerText = tagline;
    const portrait = getData("portrait");
    const image = document.getElementById("portrait");
    image.setAttribute("src", `assets/photographers/${portrait}`);
    image.setAttribute("alt", `portrait de ${name}`);    
    return;
}

function dropdownMenu() {
    document.getElementById("Dropdown").classList.toggle("show");
}

async function getPortfolio(id) {
    const { media } = await getPhotographers();
    const mediaList = media.filter(entry => entry.photographerId == id);
    const grid = document.getElementById("grid");
    mediaList.forEach(element => {
        const grid = document.createElement( 'article' );
        const link = document.createElement( 'a' );
    });
    console.log(mediaList);
    /* const article = document.createElement( 'article' );
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
    return (article); */
}

autorun();