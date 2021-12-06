class Cycle {
    constructor(frames) {
        this.engine = new FrameEngine();
        this.stopwatch = new Stopwatch();
        this.frames = frames;
    }

    next(timestamp) {
        this.stopwatch.update(Math.round(timestamp));
        this.frames.next(
            this.stopwatch.delta(this.stopwatch.old)
        );
        this.engine.next(this.next.bind(this));
    }

    launch() {
        this.engine.next(this.next.bind(this));
    }
}