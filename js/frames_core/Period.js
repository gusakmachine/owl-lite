class Period extends Range {
    update(old, current) {
        if (current > this.start && old < this.start)
            this.setNumber(this.start);
        else if (current > this.end && old < this.end)
            this.setNumber(this.end);
        else
            this.setNumber(old);
    }
}