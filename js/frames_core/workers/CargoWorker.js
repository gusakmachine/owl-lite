class CargoWorker extends EventWorker {
    constructor(duration) {
        super(0, duration);
        this.duration = duration;
    }
}