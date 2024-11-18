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
    /* const portrait = getData("portrait");
    const image = document.getElementById("portrait");
    image.setAttribute("src", `assets/photographers/${portrait}`);
    image.setAttribute("alt", `portrait de ${name}`);  */   
    return;
}

/* function dropdownMenu() {
    // Toggle dropdown visibility when combobox is clicked
    document.getElementById('dropdown').addEventListener('click', function(event) {
    const listbox = document.getElementById('listbox');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    
    // Get the currently selected fruit
    const selectedSortBy = document.getElementById('option-1').textContent;
  
    // Hide the selected fruit in the list
    const options = document.querySelectorAll('[role="option"]');
    options.forEach(option => {
      if (option.textContent === selectedSortBy) {
        option.style.display = 'none'; // Hide the selected option
      } else {
        option.style.display = 'block'; // Ensure other options are visible
      }
    });
    
    // Toggle visibility of the listbox
    this.setAttribute('aria-expanded', !expanded);
    listbox.style.display = expanded ? 'none' : 'block';
  
    // Prevent click event from closing dropdown immediately
    event.stopPropagation();
  });
  
  // Handle selection of an option
  document.querySelectorAll('[role="option"]').forEach(option => {
    option.addEventListener('click', function(event) {
      const selectedFruit = document.getElementById('selected-fruit');
      
      // Update the selected fruit text
      selectedFruit.textContent = this.textContent;
      
      // Mark this option as selected
      document.querySelectorAll('[role="option"]').forEach(opt => {
        opt.setAttribute('aria-selected', 'false');
        opt.style.display = 'block'; // Ensure all options are visible when selecting
      });
      this.setAttribute('aria-selected', 'true');
      
      // Close the dropdown
      document.getElementById('fruit-combobox').setAttribute('aria-expanded', 'false');
      document.getElementById('fruit-list').style.display = 'none';
  
      // Prevent click event from bubbling and closing dropdown again
      event.stopPropagation();
    });
  });
  
  // Close the dropdown when clicking outside the combobox
  document.addEventListener('click', function(event) {
    if (!event.target.closest('[role="combobox"]')) {
      document.getElementById('fruit-combobox').setAttribute('aria-expanded', 'false');
      document.getElementById('fruit-list').style.display = 'none';
    }
  });

} */

function sortMedia(list) {
    /* const sortedList = list.sort(function (a, b) {
        return b.likes - a.likes;
    }) */
    const sortedList = list.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    })
    return sortedList;
}

async function getPortfolio(id) {
    const { media } = await getPhotographers();
    let mediaList = media.filter(entry => entry.photographerId == id);
    mediaList = sortMedia(mediaList);   
    const grid = document.getElementById("grid");
    mediaList.forEach((element, index) => {
        const article = document.createElement( 'article' );
        grid.appendChild(article);        
        const frame = document.createElement( 'div' );
        frame.setAttribute("class", "grid-frame");
        article.appendChild(frame);       
        const media = mediaChoice(element);
        frame.appendChild(media);
        media.addEventListener('click', function(event) {
          event.preventDefault;
          lightbox(mediaList, index);
        })        
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

function lightbox(list, index) {
    const lightbox = document.getElementsByClassName( "lightbox_modal" )[0];    
    const closeLightbox = document.getElementsByClassName( "lightbox-close" )[0];
    const arrowLeft = document.getElementsByClassName( "lightbox-prev" )[0];
    const arrowRight = document.getElementsByClassName( "lightbox-next" )[0];
    lightbox.style.display = 'flex';
    const media = mediaChoice(list[index]);
    mediaDisplay(media);
    closeLightbox.addEventListener('click', function(event) {        
        closeModalLightbox(media);
    })
    arrowLeft.addEventListener('click', function(event) {
      let newIndex = null;
        if (index != 0) {
            newIndex = index;
        } else {
            newIndex = list.length - 1;
        }
        lightboxChange(list, index, newIndex);
    })
    arrowRight.addEventListener('click', function(event) {
        let newIndex = null;
        if (index != list.length) {
            newIndex = index + 1;
        } else {
            newIndex = 0;
        }
        lightboxChange(list, index, newIndex);
    })
    document.addEventListener('keyup', function (event) {
        const code = event.key;
        if (code === "Escape") {
            closeModalLightbox(mediaElement);
        } else if (code === "ArrowLeft") {
            lightboxPrevious(mediaElement);
        } else if (code === "ArrowRight") {
            lightboxNext(mediaElement);
        }
    })
}

function closeModalLightbox(media) {
    console.log(media);
    media.remove();
    const lightbox = document.getElementsByClassName( "lightbox_modal" )[0];
    lightbox.style.display = "none";
}

function lightboxChange(media, index, newIndex) {
    media = mediaChoice(media[index]);    
    media.remove();
    const newMedia = mediaChoice(media[newIndex]);
    mediaDisplay(newMedia);
}

function mediaChoice(element) {    
    const directory = directoryName();
    if (element.image != undefined) {
      const picture = `assets/images/${directory}/${element.image}`;
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture);
      return img;
    } else {
      const video = `assets/images/${directory}/${element.video}`;
      const vid = document.createElement( 'video' );
      vid.setAttribute("src", video);
      return vid;
    }
}

function directoryName() {
    const name = getData("name");
    let firstName = name.split(" ")[0];    
    firstName = firstName.replace("-", " ");
    return firstName;
}

function mediaDisplay(media) {
    const container = document.getElementsByClassName( "lightbox" )[0];
    const mediaElement = document.createElement(`${media.tagName}`);
    mediaElement.src = `${media.src}`;
    container.appendChild(mediaElement);
}

autorun();