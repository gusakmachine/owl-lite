class Offset {
    constructor(max) {
        this.old = 0;
        this.new = 0;
        this.max = max;
        this.corn = this.max / 100;
    }

    calculate(percent) {
        this.old = this.new;
        return this.new = Math.round(this.corn * percent);
    }

    reset() {
        this.old = 0;
        this.new = 0;
    }
}