class RangeProgress extends Progress {
    update(range) {
        let part = range.number - range.start,
            number = range.end - range.start;

        return this.setCurrent(
            (part / number) * Progress.max
        );
    }
}