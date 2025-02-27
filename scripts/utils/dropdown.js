function dropdownMenu() {
    const selected = document.createElement("div");
    selected.className = "select-selected";
    document.querySelector(".sort_container").appendChild(selected);

    const originalSelect = document.querySelector("select");
    const options = originalSelect.querySelectorAll("option");
    const items = document.createElement("div");
    items.className = "select-items select-hide";
    document.querySelector(".sort_container").appendChild(items);

    const line = document.createElement("div");
    line.className = "line";
    selected.appendChild(line);

    // Remplissage des options
    options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.textContent = option.textContent;

        // Ajout de l'événement pour la sélection
        optionDiv.addEventListener("click", () => {
            selected.textContent = optionDiv.textContent; // Mise à jour l'affichage
            originalSelect.value = option.value; // Mise à jour la valeur d'origine
            
            sortMedia(); // Exécution de la fonction de tri après la sélection

            items.classList.add("select-hide"); // Cache les options après sélection
            updateOptions(); // Mise à jour les options après sélection
        });

        // Empêche l'ajout de l'option si elle est sélectionnée
        if (option.value !== originalSelect.value) {
            items.appendChild(optionDiv);
        }
    });

    // Fonction pour mettre à jour les options
    function updateOptions() {
        items.innerHTML = ''; // Effacer toutes les options
        options.forEach(option => {
            if (option.value !== originalSelect.value) { // Exclure l'option sélectionnée
                const optionDiv = document.createElement("div");
                optionDiv.textContent = option.textContent;

                // Ajouter l'événement pour la sélection
                optionDiv.addEventListener("click", () => {
                    selected.textContent = optionDiv.textContent;
                    originalSelect.value = option.value;
                    sortMedia(); // Exécuter la fonction de tri

                    items.classList.add("select-hide");
                    updateOptions(); // Met à jour les options après sélection
                });

                items.appendChild(optionDiv);
            }
        });
    }

    // Fonction pour trier les médias
    function sortMedia() {
        let sortedList;
    
        try {
            sortedList = JSON.parse(Storage.load('medialist'));
        } catch (error) {
            console.error("Erreur lors du chargement de medialist :", error);
            return;
        }
    
        // Comparaison avec les valeurs des options
        switch (originalSelect.value) {
            case "0":
                medialist = sortedList.sort((a, b) => a.title.localeCompare(b.title)); // Tri par titre
                break;
            case "1":
                medialist = sortedList.sort((a, b) => b.likes - a.likes); // Tri par nombre de like
                break;
    
            default:
                break;
        }
        
        displayGrid(medialist); // Appel de la fonction pour afficher la galerie 
    }

    // Affiche/cache les options lorsque l'utilisateur clique
    selected.addEventListener("click", () => {
        items.classList.toggle("select-hide");
        selected.classList.toggle('active');
        if (line.style.display === "none") {
            line.style.display = "block";
        } else {
            line.style.display = "none";
        }
    });

    // Ferme le select si l'utilisateur clique en dehors
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.sort_container')) {
            items.classList.add("select-hide");
            selected.classList.remove('active');
            line.style.display = "none";
        }
    });

    // Initialisation avec la première option
    selected.textContent = options[originalSelect.selectedIndex].textContent;
    updateOptions(); // Appel initial pour remplir les options
}