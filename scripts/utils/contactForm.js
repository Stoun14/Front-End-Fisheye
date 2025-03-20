function displayModal() {
    const body = document.querySelector("body");
    const modal = document.getElementById("contact_modal");	
    const photographer = JSON.parse(Storage.load('photographer'));
    const name = photographer.name;
    const modalTitle = document.getElementById("modal_title");

    body.classList.add("no-scroll");
    modal.focus();

    modal.style.display = "flex";
    modalTitle.innerHTML = `Contactez-moi <span>${name}</span>`;
}

function closeModal() {
    const body = document.querySelector("body");
    const modal = document.getElementById("contact_modal");

    body.classList.remove("no-scroll")
    modal.style.display = "none";
}