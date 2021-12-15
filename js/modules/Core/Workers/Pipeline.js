class Pipeline extends FickleWorker {
    cargos = [];

    constructor(loop=false) {
        super(0,0);
        this.loop = loop;
    }

    put(cargo) {
        cargo.link(this);

        if (cargo.period.end > this.period.end)
            this.period.end = cargo.period.end;

        this.cargos.push(cargo);
    }

    update() {
        for (let cargo of this.cargos)
            cargo.process();
    }

    end() {
        if (!this.loop)
            return;

        this.stopwatch.initialize(0);

        for (let cargo of this.cargos)
            cargo.stopwatch.initialize(0);
    }
}