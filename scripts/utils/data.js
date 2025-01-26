class Storage {
    constructor(title, data) {
        this.title = title;
        this.data = data;
    }

    save() {
        localStorage.setItem(this.title, this.data);
    }

    load() {
        return localStorage.getItem(this.title);
    }
}