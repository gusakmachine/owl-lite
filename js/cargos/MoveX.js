class MoveX extends CargoWorker {
    constructor(duration, el, params) {
        super(duration);
        this.el = el;
        this.offset = new Offset(params.offset);
        this.startPosX = 0;
        this.posX = this.startPosX;
        this.posXMax = params.posXMax;
    }

    calculatePosX() {
        this.offset.calculate(this.progress.current);
        this.posX += this.offset.current - this.offset.old;
    }

    update() {
        this.calculatePosX();
        TransformRenderer.translateX(this.el, this.posX);
    }

    end() {
        this.offset.reset();

        if (this.posX >= this.posXMax)
            this.posX = this.startPosX;
    }
}