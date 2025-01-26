async function getPhotographers() {
    // Récupération des données du fichier json
    const response = await fetch("data/photographers.json");
    const data = await response.json();

    // Conversion de la liste des photographes en liste d'objet de classe Artist
    const ObjectifiedData = data.photographers.map(photographer => new Artist(photographer));

    // Stockage du tableau de données dans le localStorage
    Storage.save('objectData', JSON.stringify(ObjectifiedData));
    
    // Retour du tableau des photographes obtenu
    return ObjectifiedData
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les données des photographes
    const photographers = await getPhotographers();

    // Affiche les photographes sur la homepage
    displayData(photographers);
}

init();