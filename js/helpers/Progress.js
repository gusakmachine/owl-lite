class Progress {
    static min = 0;
    static max = 100;

    constructor() {
        this.current = 0;
    }

    setCurrent(percent) {
        return this.current = Math.max(
            Math.min(
                percent, Progress.max
            ), Progress.min
        );
    }

    update(part, number) {
        return this.setCurrent(
            (part / number) * Progress.max
        );
    }
}