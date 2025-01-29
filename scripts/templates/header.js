function headerCard(photographer) {
    const photographerName = document.querySelector(".name");
    const location = document.querySelector(".location");
    const slogan = document.querySelector(".tagline");
    const portrait = document.querySelector(".frame");

    photographerName.innerText = photographer.name;
    location.innerText = photographer._city+", "+photographer._country;
    slogan.innerText = photographer.tagline;
    portrait.innerHTML = `    
        <img src="${photographer.portrait}" alt="portrait de ${photographer.name}" />
    `;
    
    return;
}