class Math2 {
    // Does not return 0
    static random(min: number = Number.MIN_VALUE, max:number = Number.MAX_VALUE): number {
        return Math.floor(Math.random()*(max-min)) + min;;
    };
}

export {Math2}