class StaticHistory {
    start = null;
    oldest = null;
    old = null;
    current = null;
    setter = this.initialize;

    update(value) {
        this.oldest = this.old;
        this.old = this.current;
        return this.current = value;
    }

    initialize(value) {
        this.start = value;
        this.oldest = value;
        this.old = value;
        this.current = value;
        this.setter = this.update;
        this.setter(value);
    }

    set(value) {
        this.setter(value);
    }
}

class DynamicHistory {
    start = null;
    setter = this.initialize;

    constructor(length) {
        this.length = length;
        this.maxIndex = length - 1;
        this.history = new Array(this.length);
    }

    moveLeft() {
        for (let i = 0; i < this.length; i++)
            this.history[i] = this.history[i + 1];
    }

    update(value) {
        this.moveLeft();
        return this.history[this.maxIndex] = value;
    }

    initialize(value) {
        this.start = value;
        for (let i = 0; i < this.length; i++)
            this.history[i] = value;
        this.setter = this.update;
        this.setter(value);
    }

    set(value) {
        this.setter(value);
    }

    get(modifier) {
        return this.history[this.maxIndex + modifier];
    }

    getLast(count=this.length) {
        let last = [];

        for (let i = 0; i < count; i++)
            if (i < this.length)
                last.push(this.get(-i));

        return last;
    }
}

class Stopwatch extends DynamicHistory {
    start = 0;
    oldest = null;
    old = null;
    current = null;

    constructor() {
        const HISTORY_LENGTH = 3;
        super(HISTORY_LENGTH);
        this.initialize(this.start);
    }

    delta() {
        return Math.abs(this.current - this.old);
    }

    snapshot() {
        let [current,  old, oldest] = this.getLast(this.length);
        return {
            oldest: this.oldest = oldest,
            old: this.old = old,
            current: this.current = current,
        }
    }

    tick(modifier) {
        let current = this.get(0);

        if (modifier > 0)
            this.set(current + modifier);
        this.snapshot();

        return current;
    }
}

class Cycle {
    constructor(gStopwatch, workers) {
        this.stopwatch = gStopwatch;
        this.workers = workers;
        this.engine = new FrameEngine();
        this.timestamp = new StaticHistory();
    }

    timeDelta() {
        return Math.abs(this.timestamp.current - this.timestamp.old);
    }

    process(timestamp) {
        this.timestamp.set(Math.round(timestamp));
        this.stopwatch.tick(this.timeDelta());

        for (let worker of this.workers)
            worker.process();

        this.engine.next(this.process.bind(this));
    }

    idle(timestamp) {
        this.timestamp.set(Math.round(timestamp));
        this.stopwatch.tick(this.timeDelta());
        this.engine.next(this.process.bind(this));
    }

    launch() {
        for (let worker of this.workers)
            worker.link(this);

        this.engine.next(this.idle.bind(this));
    }
}