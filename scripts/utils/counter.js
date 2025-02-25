function hearts() {
    const hearts = document.querySelectorAll('.likes');
    const totalLikesCounter = document.querySelector(".likes_counter");
    const costElement = document.querySelector(".cost");
    
    init();

    hearts.forEach((heart) => {
        heart.addEventListener('click', function () {
            let currentLikes = parseInt(heart.innerHTML) || 0;
            heart.innerHTML = (currentLikes + 1) + '  <i class="fa-solid fa-heart"></i>';
            counter(1);
        });
    });

    function init() {
        const totalLikes = calculateTotalLikes();
        const photographer = JSON.parse(Storage.load('photographer'));
        
        costElement.innerHTML = photographer.price + " €/jour";
        totalLikesCounter.innerHTML = totalLikes + ' <i class="fa-solid fa-heart"></i>';
        counter(0);
    }

    function calculateTotalLikes() {
        let totalLikes = 0;
        const mediaList = JSON.parse(Storage.load('medialist'));
        mediaList.forEach((element) => {
            totalLikes += element.likes;
        });
        return totalLikes;
    }

    function counter(nb) {
        const currentTotalLikes = calculateTotalLikes();
        const nbLikes = nb + currentTotalLikes;
        totalLikesCounter.innerHTML = nbLikes + ' <i class="fa-solid fa-heart"></i>';
    }
}