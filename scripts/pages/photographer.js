async function autorun() {
    //récupération de l'id du photographe dans le lien
    const id = window.location.hash.substring(1);
    // Récupération des données des photographes du fichier json
    const { photographers } = await getPhotographers();
    const photographer = photographers.find(entry => entry.id == id);
    // Stockage des données du photographe dans le localStorage
    dataStorage(photographer);
    getCardDOM();
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

autorun();