class OwlCargoProgress extends FickleWorker {
    constructor(begin, finish, progressBar) {
        super(begin, finish);
        this.progressBar = progressBar;
    }

    update() {
        TransformRenderer.translateX(this.progressBar, this.progress.current, '%');
    }
}

class OwlCargoMove extends FickleWorker {
    constructor(begin, finish, el, params) {
        super(begin, finish);
        this.el = el;
        this.direction = params.direction;
        this.offset = new Offset(params.offset);
        this.startPosX = 0;
        this.posX = this.startPosX;
        this.posXMax = params.posXMax;
    }

    calculatePosX() {
        this.offset.calculate(this.progress.current);
        this.posX += this.offset.new - this.offset.old;
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

class OwlCargoVisibility extends FickleWorker {
    constructor(begin, finish, el) {
        super(begin, finish);
        this.el = el;
        this.display = this.el.style.display? this.el.style.display : 'block';
    }

    start() {
        this.el.style.display = this.display;
    }

    end() {
        this.el.style.display = 'none';
    }
}