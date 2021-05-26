class Vector {
    // Cartersian Coordinates
    x: number;
    y: number;
    dx?: number;
    dy?: number;
    d2x?: number;
    d2y?: number;

    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector): Vector {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    subtract(v: Vector): Vector {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    scale(k: number): Vector {
        this.x *= k;
        this.y *= k;
        return this;
    }

    negate(): Vector {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}

export {Vector}