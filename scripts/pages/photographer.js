function init() {
    const params = new URLSearchParams(window.location.search);
    const urlData = JSON.parse(decodeURIComponent(params.get('data')));
    const photographer = new Artist(urlData);
    headerCard(photographer);
    
}

init();