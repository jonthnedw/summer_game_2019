define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vector = void 0;
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        add(v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        }
        subtract(v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }
        scale(k) {
            this.x *= k;
            this.y *= k;
            return this;
        }
        negate() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }
        mag() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }
    exports.Vector = Vector;
});
//# sourceMappingURL=Vector.js.map