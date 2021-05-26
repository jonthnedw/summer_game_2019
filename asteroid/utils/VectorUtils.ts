import {Vector} from "./Vector"

class VectorUtils {
    static dot(v: Vector, u: Vector): number {
        return v.x * v.y + u.x * u.y;
    }

    static norm(v: Vector): Vector {
        const mag: number = v.mag()
        return new Vector(v.x / mag, v.y / mag)
    }
}

export {VectorUtils}