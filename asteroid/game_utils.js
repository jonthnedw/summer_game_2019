define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.height = exports.width = exports.canvas = exports.ctx = exports.random = exports.notZero = exports.GameTile = exports.VectorObject = void 0;
    const canvas = document.querySelector('canvas');
    exports.canvas = canvas;
    const ctx = canvas.getContext('2d');
    exports.ctx = ctx;
    const width = canvas.width = window.innerWidth;
    exports.width = width;
    const height = canvas.height = window.innerHeight;
    exports.height = height;
    function random(min, max) {
        let num = Math.floor(Math.random() * (max - min)) + min;
        return num;
    }
    exports.random = random;
    ;
    function notZero(n, min, max) {
        if (n == 0) {
            return notZero(random(min, max), min, max);
        }
        return n;
    }
    exports.notZero = notZero;
    ;
    class GameTile {
        constructor(imageURL) {
            this.isLoaded = false;
            this.image = new Image();
            this.image.src = imageURL;
        }
    }
    exports.GameTile = GameTile;
    ;
    class VectorObject {
        constructor(x, y, velX, velY, exists) {
            this.x = x;
            this.y = y;
            this.velX = velX;
            this.velY = velY;
            this.exists = exists;
        }
    }
    exports.VectorObject = VectorObject;
    ;
});
//# sourceMappingURL=game_utils.js.map