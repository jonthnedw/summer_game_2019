define(["require", "exports", "./Vector"], function (require, exports, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VectorUtils = void 0;
    class VectorUtils {
        static dot(v, u) {
            return v.x * v.y + u.x * u.y;
        }
        static norm(v) {
            const mag = v.mag();
            return new Vector_1.Vector(v.x / mag, v.y / mag);
        }
    }
    exports.VectorUtils = VectorUtils;
});
//# sourceMappingURL=VectorUtils.js.map