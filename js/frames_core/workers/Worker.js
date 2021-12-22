class Worker {
    constructor() {
        this.skip = false;
        this.stopwatch = new Stopwatch(0);
    }

    pause(skip=!this.skip) {
        return this.skip = skip;
    }

    reset() {
        this.stopwatch.initialize(0);
    }

    turnover() {
        //...
    }

    process(delta) {
        if (this.skip)
            return;

        this.stopwatch.tick(delta);
        this.turnover();
    }
}