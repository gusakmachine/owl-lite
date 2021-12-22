class Wait extends CargoWorker {
    pause(skip=!this.skip) {
        this.working = true;
        return this.skip = skip;
    }
}