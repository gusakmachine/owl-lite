class Offset extends VariableStaticHistory {
    constructor(max) {
        super();
        this.max = max;
        this.corn = this.max / 100;
    }

    calculate(percent) {
        return this.update(
            Math.round(this.corn * percent)
        );
    }

    reset() {
        this.initialize(0);
    }
}