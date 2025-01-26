class Storage {
    static save(title, data) {
        localStorage.setItem(title, data);
    }

    static load(title) {
        return localStorage.getItem(title);
    }
}