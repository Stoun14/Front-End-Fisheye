let mediaList = null;
let photographer = null;

async function autorun() {
    //récupération de l'id du photographe dans le lien
    const id = window.location.hash.substring(1);
    // Récupération des données des photographes du fichier json
    const { photographers } = await getPhotographers();
    photographer = photographers.find(entry => entry.id == id);
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

function dropdownMenu() {
    // Toggle dropdown visibility when combobox is clicked
    document.getElementById('dropdown').addEventListener('click', function(event) {
    const listbox = document.getElementById('listbox');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    
    // Get the currently selected item
    const selectedSortBy = document.getElementById('option-1').textContent;
  
    // Hide the selected item in the list
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
      
      // Update the selected item text
      selectedFruit.textContent = this.textContent;
      
      // Mark this option as selected
      document.querySelectorAll('[role="option"]').forEach(opt => {
        opt.setAttribute('aria-selected', 'false');
        opt.style.display = 'block'; // Ensure all options are visible when selecting
      });
      this.setAttribute('aria-selected', 'true');
      
      // Close the dropdown
      document.getElementById('combobox').setAttribute('aria-expanded', 'false');
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

}

/* function dropdownMenu() {
    // Toggle dropdown visibility when combobox is clicked
    document.getElementById('dropdown').addEventListener('click', function(event) {
    const listbox = document.getElementById('listbox');
    const expanded = this.getAttribute('aria-expanded') === 'true';
    
    // Get the currently selected item
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

async function getPortfolio(id) {
    const { media } = await getPhotographers();
    mediaList = media.filter(entry => entry.photographerId == id);
    mediaList = sortMedia(mediaList);   
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
        info.setAttribute("class", "img-info");
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