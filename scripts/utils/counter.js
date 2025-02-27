function hearts() {
    const hearts = document.querySelectorAll('.likes');
    const totalLikesCounter = document.querySelector(".likes_counter");
    const costElement = document.querySelector(".cost");
    
    init(); // Appel de la fonction d'initialisation

    hearts.forEach((heart) => {
        // Ajout de l'événement pour liker
        heart.addEventListener('click', function () {
            let currentLikes = parseInt(heart.innerHTML) || 0;
            heart.innerHTML = (currentLikes + 1) + ' <a href="#"><i class="fa-solid fa-heart"></i></a>';
            counter(1); // Appel de la fonction de comptage de like total
        });
    });

    // // Fonction d'initialisation
    function init() {
        const totalLikes = calculateTotalLikes();
        const photographer = JSON.parse(Storage.load('photographer'));
        
        costElement.innerHTML = photographer.price + " €/jour"; // Affichage du prix
        totalLikesCounter.innerHTML = totalLikes + ' <a href="#"><i class="fa-solid fa-heart"></i></a>'; // Affichage du nombre de like
        counter(0); // Appel de la fonction de comptage de like total
    }

    function calculateTotalLikes() {
        let totalLikes = 0;
        const mediaList = JSON.parse(Storage.load('medialist')); // Chargement de la liste des médias de l'artiste

        mediaList.forEach((element) => {
            totalLikes += element.likes;
        }); // Calcul de la valeur totale de like 

        return totalLikes; // Renvoi de la valeur totale de like
    }

    // Fonction de comptage du nombre de like total du photographe
    function counter(nb) {
        const currentTotalLikes = calculateTotalLikes();
        const nbLikes = nb + currentTotalLikes;

        totalLikesCounter.innerHTML = nbLikes + ' <i class="fa-solid fa-heart"></i>'; // Affichage du nombre de like total
    }
}