class WorkerEvents {
    start() {}
    update() {}
    end() {}
}

class WorkerBase extends WorkerEvents {
    constructor() {
        super();
        this.paused = false;
        this.employer = null;
    }

    pause(paused=!this.paused) {
        return this.paused = paused;
    }

    link(employer) {
        this.employer = employer;
    }
}

class FickleWorker extends WorkerBase {
    constructor(begin, finish) {
        super();
        this.period = new Range(begin, finish);
        this.progress = new RangeProgress();
        this.stopwatch = new Stopwatch();
    }

    route() {
        if (this.period.inRange()) {
            this.progress.update(this.period);

            if (this.period.isStart())
                this.start();

            this.update();

            if (this.period.isEnd())
                this.end();
        }
    }

    process() {
        if (this.paused)
            return;

        this.stopwatch.tick(this.employer.stopwatch.delta());

        if (this.stopwatch.current > this.period.start && this.stopwatch.old < this.period.start)
            this.period.setNumber(this.period.start);
        else if (this.stopwatch.current > this.period.end && this.stopwatch.old < this.period.end)
            this.period.setNumber(this.period.end);
        else
            this.period.setNumber(this.stopwatch.old);

        this.route();
    }
}

