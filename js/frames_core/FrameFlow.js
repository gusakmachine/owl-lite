class FrameFlow {
    constructor() {
        this.workers = [];
        this.stopwatch = new Stopwatch();
        this.engine = new FrameEngine();
    }

    put(worker) {
        this.workers.push(worker);
    }

    route() {
        for (let worker of this.workers)
            worker.process(this.stopwatch.tickDelta);
    }

    process() {
        this.stopwatch.tick(this.engine.stopwatch.delta);
        this.route();
        this.engine.next(this.process, this);
    }

    outstrip() {
        this.stopwatch.tick(this.engine.stopwatch.delta);
        this.engine.next(this.process, this);
    }

    launch() {
        this.engine.next(this.outstrip, this);
    }
}