class PipelineWorker extends Worker {
    constructor(start=0, loop=false) {
        super();
        this.start = start;
        this.loop = loop;
        this.cargos = [];
        this.cargoIndex = 0;
    }

    setCargoIndex(index=0) {
        this.cargoIndex = index;
    }

    put(cargo) {
        cargo.loop = this.loop;
        this.cargos.push(cargo);
    }

    next() {
        this.setCargoIndex(this.cargoIndex + 1);

        if (this.cargoIndex === this.cargos.length)
            if (this.loop)
                this.setCargoIndex();
    }

    turnover() {
        if (this.stopwatch.current < this.start)
            return;

        let cargo = this.cargos[this.cargoIndex];

        if (!cargo)
            return;

        cargo.process(this.stopwatch.tickDelta);

        if (!cargo.working)
            this.next();
    }
}