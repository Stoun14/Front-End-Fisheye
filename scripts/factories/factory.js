class MediaFactory {
    constructor(data) {
        // 
        if (data.image != undefined) {
            return new Image(data)
        // 
        } else {
            return new Video(data) 
        }
    }
}