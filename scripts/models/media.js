class Media {
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
		this._title = data.title;
		this._likes = data.likes;
		this._date	= data.date;
        this._price = data.price;
    }

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }
}

class Image extends Media {
    constructor(data) {
        super(data);
        this._image = data.image;
    }

    picture(artistFirstname) {
        return `/assets/photographers/${artistFirstname}/${this._image}`;
    }
}

class Video extends Media {
    constructor(data) {
        super(data);
        this._video = data.video;
    }

    video(artistFirstname) {
        return `/assets/photographers/${artistFirstname}/${this._video}`;
    }
}