function hearts() {
    let hearts = document.querySelectorAll('.likes');
    hearts.forEach((heart, index) => {
        heart.addEventListener('click', function () {
            console.log(hearts[index]);
            /* hearts[index] += 1;
            document.querySelector('.likes')[index].innerHTML = hearts[index]; */
            counter(1);
        });
    });
    counter(0);

    function counter(nb) {
        let totalLikes = 0
        /* mediaList.forEach((element) => {
          totalLikes += element.likes;
        }) */
        const totalLikesCounter = document.querySelector(".likes_counter");
        const cost = document.querySelector(".cost")
        cost.innerHTML = photographer.price + " €/jour";
        const nbLikes = nb + totalLikes;
        totalLikesCounter.innerHTML = nbLikes + '  <i class="fa-solid fa-heart"></i>';
    }
}