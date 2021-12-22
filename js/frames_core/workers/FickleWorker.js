class FickleWorker extends Worker {
    constructor(begin, finish, loop=false) {
        super();
        this.period = new Period(begin, finish);
        this.progress = new RangeProgress();
        this.loop = loop;
        this.working = null;
    }

    route() {
        //...
    }

    turnover() {
        this.period.update(this.stopwatch.old, this.stopwatch.current);
        this.progress.update(this.period);
        this.working = this.period.inRange();

        if (this.working)
            this.route();
        else if (this.loop)
            this.reset();
    }
}