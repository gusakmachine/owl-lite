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

class RangeProgress extends Progress {
    update(range) {
        let part = range.number - range.start,
            number = range.end - range.start;

        return this.setCurrent(
            (part / number) * Progress.max
        );
    }
}