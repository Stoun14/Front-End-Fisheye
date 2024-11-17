function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    const name = document.getElementById("name").innerText;
    let modalTitle = document.getElementById("modal_title").textContent;
    if (modalTitle === "Contactez-moi") {       
        modalTitle = modalTitle +" "+ `${name}`; 
    }    
    document.getElementById("modal_title").textContent = modalTitle;
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
