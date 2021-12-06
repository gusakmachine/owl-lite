class OwlCargoMove extends Cargo {
    constructor(start, end, offset, direction=1) {
        super(start, end);
        this.direction = direction;
        this.offset = new Offset(offset);
    }

    setState(state) {
        this.state = state;
    }

    update() {
        this.offset.calculate(this.progress.current);
        this.state.translateX += this.direction * this.offset.delta();
    }

    reset() {
        this.offset.setNew(0);
        this.offset.setOld(0);
    }
}