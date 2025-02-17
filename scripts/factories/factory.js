class MediaFactory {
    constructor(data) {
        if (data.image !== undefined) {
            return new Image(data);
        } else if (data.video !== undefined) {
            return new Video(data);
        } else {
            throw new Error("Type de media non supporté!");
        }
    }
}