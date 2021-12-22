class MoveXByPercent extends CargoWorker {
    constructor(duration, progressBar) {
        super(duration);
        this.progressBar = progressBar;
    }

    update() {
        TransformRenderer.translateX(this.progressBar, this.progress.current, '%');
    }

    end() {
        TransformRenderer.translateX(this.progressBar, 0);
    }
}