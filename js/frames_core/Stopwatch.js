class Stopwatch extends VariableStaticHistory {
    tickDelta = null;
    delta = null;

    constructor(initValue=null) {
        super();
        this.initialize(initValue);
    }

    updateDelta() {
        return this.delta = Math.abs(this.current - this.old);
    }

    tick(delta) {
        if (delta > 0) {
            this.tickDelta = delta;
            this.update(this.current + delta);
        }

        this.updateDelta();
        return this.current;
    }

    translate(current) {
        this.update(current);
        this.updateDelta();
        return this.current;
    }
}