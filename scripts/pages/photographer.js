let mediaList = null;
let photographer = null;
let indexGeneral = null;

async function autorun() {
    //récupération de l'id du photographe dans le lien
    const id = window.location.hash.substring(1);
    // Récupération des données des photographes du fichier json
    const { photographers } = await getPhotographers();
    photographer = photographers.find(entry => entry.id == id);
    // Stockage des données du photographe dans le localStorage
    dataStorage(photographer);
    getCardDOM();
    const { media } = await getPhotographers();
    mediaList = media.filter(entry => entry.photographerId == id);
    getPortfolio();
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
    /* const portrait = getData("portrait");
    const image = document.getElementById("portrait");
    image.setAttribute("src", `assets/photographers/${portrait}`);
    image.setAttribute("alt", `portrait de ${name}`);  */   
    return;
}

window.onload = () => {
  const selectElement = document.querySelector("#order_by");
  const sortContainer = document.querySelector(".sort_container");
  sortContainer.innerHTML += '\
  <div class="new-select">\
  <div class="main-option"><img src="assets/icons/selector_up.svg" alt=""></div>\
  <div class="line"></div>\
  <div class="option_list select-hide">\
  </div>\
  </div>'; 
  /* const newSelect = document.createElement( "div" );
  newSelect.classList.add("new-select");
  sortContainer.appendChild(newSelect);
  newSelect.innerHTML = '<span class="select_button">'+ selectElement.options[selectElement.selectedIndex].innerHTML +'<img src="assets/icons/selector_up.svg" alt="" class="arrow"></span>'
  const selectMenu = document.createElement( "div" );
  selectMenu.classList.add("", "") */
  for (let index = 0 option of selectElement.options) {
    if (option.innerHTML !== selectElement.options[selectElement.selectedIndex].innerHTML) {
      let newOption = document.createElement( "div" );
      newOption.classList.add("option");
      newOption.innerHTML = option.innerHTML;
      newOption.addEventListener("click", function () {
        for (let option of selectElement.options) {
          if (option.innerHTML === this.innerHTML) {
            const selectButton = document.querySelector(".select_button")
            selectElement.selectedIndex = option.index;
            selectButton.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML +'<img src="assets/icons/selector_up.svg" alt="" class="arrow">';
            indexGeneral = selectElement.selectedIndex;
            if (indexGeneral === 1) {
              newOption.innerHTML = selectElement.options[0].innerHTML;
            } else {
              newOption.innerHTML = selectElement.options[1].innerHTML;
            }            
          } 
        }
        newSelect.click();
        sortMedia();
      })
      selectMenu.appendChild(newOption);
      const line = document.createElement( "div" );
      line.classList.add("line")
      newSelect.appendChild(line);
      let index = (option.index - 1) <= 0 ? 0 : (option.index - 1);
      const nb = (index * 52) + 60;
      line.style.top = nb + "px";
    }
  };
  newSelect.appendChild(selectMenu);
  newSelect.addEventListener("click", function (event) {
    event.stopPropagation;
    const arrow = document.querySelector(".arrow");
    const line = document.querySelector(".line");
    this.lastChild.classList.toggle("select-hide");
    const active = this.classList.toggle("active");
    line.style.display = active ? 'block' : 'none';
    arrow.style.rotate = active ? '0deg' : '180deg';
  })
}

function sortMedia() {
    if (indexGeneral === 1) {
      const sortedList = mediaList.sort(function (a, b) {
      return b.likes - a.likes;
      })
      mediaList = sortedList;
    } else {
      const sortedList = mediaList.sort(function (a, b) {
      return a.title.localeCompare(b.title);
      })
      mediaList = sortedList;
    }    
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
              <source src="${video}">
          </video>`;
      return vid;        
  } else if (element?.video == null) {
      const picture = `assets/images/${directory}/${element.image}`;
      const img = `<img src="${picture}"  alt=""></img>`;
      return img;
  }
}

async function getPortfolio() {
    sortMedia();
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
        // info.setAttribute("class", "img-info");
        article.appendChild(info);
        const title = document.createElement( 'p' );
        title.setAttribute("class", "title");
        title.textContent = element.title;
        info.appendChild(title);
        const heart = '  <i class="fa-solid fa-heart"></i>';
        const totalLikes = document.getElementsByClassName("likes_counter");
        totalLikes.innerHTML = counter(element.likes) + heart;
        const likes = document.createElement( 'p' );
        likes.setAttribute("class", "likes");        
        likes.innerHTML = element.likes + heart;        
        likes.addEventListener('click', () => {
            const nbLikes = element.likes + 1;
            likes.innerHTML = nbLikes + heart;
            totalLikes.innerHTML = counter(1) + heart;           
        })
        info.appendChild(likes);        
    });
}

function counter(nb) {
    const totalLikes = document.getElementsByClassName("likes_counter");
    const nbLikes = nb + totalLikes;    
    return nbLikes;
}

autorun();