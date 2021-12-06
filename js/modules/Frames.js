class Frames {
    constructor(start=null, end=null) {
        this.duration = new Duration(start, end);
        this.progress = new Progress();
    }

    isFirst() {
        return (
            Math.max(this.duration.current, this.duration.start) === this.duration.start
        );
    }

    isLast() {
        return (
            Math.min(this.duration.current, this.duration.end) === this.duration.end
        );
    }

    isLaunchTime() {
        //BAG

        /*
            (start: 0 end: 21, curr: 0; true && true)
            (start: 0, end 21, curr: 11; true && true)

            (start: 0, end 21, curr: 22; true && false) :INCORRECT
            (start: 0, end 21, curr: 22; true && true) :CORRECT

            * From `start` to `end`, inclusive
            * For `this.end();`

            (start: 0, end 21, curr: 33; true && false)
         */

        return (
            this.duration.current >= this.duration.start &&
            this.duration.current <= this.duration.end
        );
    }

    start() {
        //...
    }

    update() {
        //...
    }

    end() {
        //...
    }

    render() {
        //...
    }

    route() {
        if (this.isLaunchTime()) {
            if (this.isFirst())
                this.start();

            this.update();

            if (this.isLast())
                this.end();
        }

        this.render();
    }

    next(deltaTime) {
        this.duration.update(deltaTime);
        this.progress.update(
            this.duration.current, this.duration.end
        );
        this.route();
    }
}