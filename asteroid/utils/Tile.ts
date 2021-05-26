class Tile {
    visible: boolean;
    image: HTMLImageElement;

    constructor(imageURL) {
        this.image = new Image();
        this.image.src = imageURL;
        this.visible = false;
    }
}

export {Tile}