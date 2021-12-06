class State {
    constructor (data={}) {
        this.changed = false;
        this.data = data;

        //learn
        return new Proxy(this, this);
    }

    closeChanges() {
        return this.changed = false;
    }

    openChanges() {
        return this.changed = true;
    }

    update(key, value) {
        if (this.data[key] === value)
            return value;

        this.openChanges();

        return this.data[key] = value;
    }

    get (target, prop) {
        return this[prop] || this.data[prop];
    }
}

class Pipeline extends Frames {
    pipeline = [];

    constructor(end) {
        super(0, end);
        this.state = new State();
    }

    put(cargo) {
        cargo.setState(this.state);
        this.pipeline.push(cargo);
    }

    update() {
        for (let cargo of this.pipeline)
            cargo.next(this.duration.current);
    }

    draw() {
        //...
    }

    render() {
        if (!this.state.changed)
            return;

        this.draw();

        this.state.closeChanges();
    }
}

class TransformRenderer {
    static translate(el, {x,y,z, type='px'}) {
        el.style.transform = (
            `translate3d(${x}${type}, ${y}${type}, ${z}${type})`
        )
    }
}

class OwlPipeline extends Pipeline {
    constructor(end, stage) {
        super(end);
        this.stage = stage;
        this.state = new State({
            translate: {
                x: 0, y: 0, z: 0,
            },
        });
    }

    draw() {
        console.log('state changed, so draw', this.state.translate);
        TransformRenderer.translate(this.stage, this.state.translate);
    }
}
