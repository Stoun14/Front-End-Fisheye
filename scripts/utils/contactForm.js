function displayModal() {
    const modal = document.getElementById("contact_modal");	
    const photographer = JSON.parse(Storage.load('photographer'));
    const name = photographer.name;
    const modalTitle = document.querySelector('.modal_title');

    modal.style.display = "flex";
    modalTitle.innerHTML = `Contactez-moi <span>${name}</span>`;
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}