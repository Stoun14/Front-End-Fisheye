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
    const name = getData("name");
    let firstName = name.split(" ")[0];    
    firstName = firstName.replace("-", " ");    
    const grid = document.getElementById("grid");
    mediaList.forEach(element => {
        const article = document.createElement( 'article' );
        grid.appendChild(article);
        const link = document.createElement( 'a' );
        article.appendChild(link);
        const frame = document.createElement( 'div' );
        article.appendChild(frame);
        if (element.image != null) {
            const picture = `assets/images/${firstName}/${element.image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            frame.appendChild(img);
        } else {
            const video = `assets/images/${firstName}/${element.video}`;
            const vid = document.createElement( 'video' );
            vid.setAttribute("src", video);
            frame.appendChild(vid);
        }
        const info = document.createElement( 'p' );
        info.setAttribute("class", "img-info");
        article.appendChild(info);
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = element.title;
        info.appendChild(title);
        const likes = document.createElement( 'p' );
        likes.setAttribute("class", "likes");
        likes.innerHTML = element.likes+'<i class="fa-solid fa-heart"></i>';
        info.appendChild(likes);
    });
}

autorun();