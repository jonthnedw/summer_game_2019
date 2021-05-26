define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Math2 = void 0;
    class Math2 {
        // Does not return 0
        static random(min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
            return Math.floor(Math.random() * (max - min)) + min;
            ;
        }
        ;
    }
    exports.Math2 = Math2;
});
//# sourceMappingURL=Math2.js.map