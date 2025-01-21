let mediaList = null;
let photographer = null;

async function autorun() {
    // Récupération de l'id du photographe dans le lien
    const id = window.location.hash.substring(1);
    // Récupération des données des photographes du fichier json
    const { photographers } = await getPhotographers();
    photographer = photographers.find(entry => entry.id == id);
    // Stockage des données du photographe dans le localStorage
    dataStorage(photographer);
    getCardDOM();
    const { media } = await getPhotographers();
    mediaList = media.filter(entry => entry.photographerId == id);
    counter(0);    
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
    window.localStorage.setItem("price", data.price);    
}

function getData(varName) {
    varName = window.localStorage.getItem(varName);
    return varName;
}

async function getCardDOM() {
    const name = photographer.name;
    const photographerName = document.getElementById("name");
    photographerName.innerText = name;
    const city = photographer.city;
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

window.onload = () => {

  autorun();

  console.log(mediaList);
  
  const selectElement = document.querySelector(".order_by");
  const sortContainer = document.querySelector(".sort_container");
  sortContainer.innerHTML += `
      <div class="new-select">
          <div class="main-option"><img src="assets/icons/selector_up.svg" alt="" class="arrow"></div>
          <div class="option-list select-hide"></div>
      </div>`;

  const newSelect = document.querySelector(".new-select");
  const selectButton = document.querySelector(".main-option");
  const arrow = document.querySelector(".arrow");
  const optionList = document.querySelector(".option-list");

  const selectedOption = selectElement.options[selectElement.selectedIndex]; 
  if (selectedOption) {
      selectButton.insertAdjacentHTML('afterbegin', selectedOption.innerText);
  }

  sortMedia();

  const optionArray = Array.from(selectElement.options);
  optionArray.forEach((option, index) => {
      const newOption = document.createElement("div");
      newOption.classList.add(`options[${index}]`);
      newOption.innerText = option.innerText;
      optionList.appendChild(newOption);

      const line = document.createElement("div");
      line.classList.add(`line[${index}]`);
      newSelect.appendChild(line);
      line.style.top = `${(index * 52) + 60}px`;

      if (newOption.innerText === selectedOption.innerText) {
          newOption.style.display = "none";
          line.style.display = "none";
      }

      newOption.addEventListener("click", function () {
          const previousText = selectButton.innerText;
          selectButton.innerText = this.innerText;
          this.innerText = previousText; 

          selectElement.selectedIndex = index; 
          
          newSelect.click;

          sortMedia();
      });
  });

  newSelect.appendChild(optionList);
  newSelect.addEventListener("click", function (event) {
      event.stopPropagation();
      optionList.classList.toggle("select-hide");
      const active = this.classList.toggle("active");
      arrow.style.rotate = active ? '0deg' : '180deg';
  });
};



function sortMedia() {
    if (!mediaList || !Array.isArray(mediaList)) {
      console.error("mediaList n'est pas défini ou n'est pas un tableau.");
      return;
    }

    const sortedList = [...mediaList];
    const mainOption = document.querySelector(".main-option").innerText.trim();
    if (mainOption === "popularité") {
      sortedList.sort((a, b) => b.likes - a.likes);
    } else {
      sortedList.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    getPortfolio();    
}

function directoryName() {
  const name = photographer.name;
  let firstName = name.split(" ")[0];    
  firstName = firstName.replace("-", " ");
  return firstName;
}

function mediaChoice(element) {  
  const directory = directoryName();
  if (element == undefined) {
      return "";
  }  
  else if (element?.image == null) {
      const video = `assets/images/${directory}/${element.video}`;
      const vid =  
          `<video>
              <source src="${video}" alt="${element.title}, closeup view">
          </video>`;
      return vid;        
  } else if (element?.video == null) {
      const picture = `assets/images/${directory}/${element.image}`;
      const img = `<img src="${picture}" alt="${element.title}, closeup view"></img>`;
      return img;
  }
}

async function getPortfolio() {
    const grid = document.getElementById("grid");
    mediaList.forEach((element, index) => {
        const article = document.createElement( 'article' );
        grid.appendChild(article);        
        let frame = document.createElement( 'div' );
        frame.setAttribute("class", "grid-frame");             
        const gridMedia = mediaChoice(element);        
        frame.innerHTML = gridMedia;
        article.appendChild(frame);
        frame.setAttribute("onclick", `displayLightbox(${index})`);     
        const info = document.createElement( 'p' );
        info.classList.add("img-info")
        article.appendChild(info);
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = element.title;
        info.appendChild(title);
        const heart = '  <i class="fa-solid fa-heart"></i>';        
        const likes = document.createElement( 'p' );
        likes.setAttribute("class", "likes");        
        likes.innerHTML = element.likes + heart;        
        likes.addEventListener('click', () => {
            const nbLikes = element.likes + 1;
            likes.innerHTML = nbLikes + heart;
            counter(1);           
        })
        info.appendChild(likes);        
    });
}

function counter(nb) {
    let totalLikes = 0
    mediaList.forEach((element) => {
      totalLikes += element.likes;
    })
    const totalLikesCounter = document.querySelector(".likes_counter");
    const cost = document.querySelector(".cost")
    cost.innerHTML = photographer.price + " €/jour";
    const nbLikes = nb + totalLikes;
    totalLikesCounter.innerHTML = nbLikes + '  <i class="fa-solid fa-heart"></i>';
}