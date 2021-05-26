define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tile = void 0;
    class Tile {
        constructor(imageURL) {
            this.image = new Image();
            this.image.src = imageURL;
            this.visible = false;
        }
    }
    exports.Tile = Tile;
});
//# sourceMappingURL=Tile.js.map