function artistFilter() {
    const params = new URLSearchParams(window.location.search);
    const urlData = JSON.parse(decodeURIComponent(params.get('data')));    
    Storage.save('photographer', JSON.stringify(urlData));
    const photographer = new Artist(urlData);   
    return photographer;
}

function mediaFilter(artist) {
    const data = JSON.parse(Storage.load('objectData'));
    const { media } = data;
    let mediaList = media.filter(entry => entry.photographerId == artist.id);
    Storage.save('medialist', JSON.stringify(mediaList));
    return mediaList;
}