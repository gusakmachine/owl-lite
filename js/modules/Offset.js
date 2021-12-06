class Offset {
    constructor(max) {
        this.old = 0;
        this.new = 0;
        this.max = max;
        this.corn = this.max / 100;
    }

    setOld(value) {
        this.old = value;
    }

    setNew(value) {
        this.setOld(this.new);
        this.new = value;
    }

    delta() {
        return Math.abs(this.new - this.old);
    }

    calculate(percent) {
        return this.setNew(
            Math.round(
                this.corn * percent
            )
        );
    }
}