class FrameEngine {
    constructor() {
        this.id = null;
        this.stopwatch = new Stopwatch();
    }

    setId(id) {
        return this.id = id;
    }

    next(callback, context) {
        this.setId(
            requestAnimationFrame((timestamp) => {
                this.stopwatch.translate(Math.round(timestamp));
                callback.call(context);
            })
        );
    }

    cancel() {
        cancelAnimationFrame(this.id);
        this.stopwatch.initialize(0);
    }
}