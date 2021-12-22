class EventWorker extends FickleWorker {
    start() {
        //...
    }

    update() {
        //...
    }

    end() {
        //...
    }

    route() {
        if (this.period.isStart())
            this.start();

        this.update();

        if (this.period.isEnd())
            this.end();
    }
}