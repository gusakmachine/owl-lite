class Stopwatch {
    start = null;
    old = null
    current = null;

    setStart(time) {
        return this.start = time;
    }

    setOld(time) {
        return this.old = time;
    }

    setCurrent(time) {
        return this.current = time;
    }

    delta() {
        return Math.abs(this.current - this.old);
    }

    update(time) {
        if (this.start == null)
            this.setStart(time);

        if (this.current == null)
            this.setOld(time);
        else
            this.setOld(this.current);

        return this.setCurrent(time);
    }
}

class Duration {
    constructor(start=null, end=null, current=0) {
        this.start = start;
        this.end = end;
        this.current = current;
    }

    setEnd(time) {
        return this.end = time;
    }

    setStart(time) {
        return this.start = time;
    }

    setCurrent(time) {
        return this.current = time;
    }

    update(deltaTime) {
        return this.setCurrent(
            this.current + deltaTime
        );
    }
}