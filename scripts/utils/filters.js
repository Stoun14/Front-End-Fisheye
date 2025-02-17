function artistFilter() {
    const params = new URLSearchParams(window.location.search);
    const urlData = JSON.parse(decodeURIComponent(params.get('data')));
    const photographer = new Artist(urlData);
    Storage.save('photographer', photographer);   
    return photographer;
}

function mediaFilter(artist) {
    const data = JSON.parse(Storage.load('objectData'));
    const { media } = data;
    let mediaList = media.filter(entry => entry.photographerId == artist.id);
    Storage.save('medialist', mediaList);
}