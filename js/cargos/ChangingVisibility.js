class ChangingVisibility extends CargoWorker {
    constructor(duration, el, display='flex') {
        super(duration);
        this.el = el;
        this.display = display;
    }

    start() {
        this.el.style.display = this.display;
    }

    end() {
        this.el.style.display = 'none';
    }
}