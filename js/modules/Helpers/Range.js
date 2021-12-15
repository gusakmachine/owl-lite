class Range {
    number = null;

    constructor(start=null, end=null) {
        this.start = start;
        this.end = end;
    }

    setNumber(number) {
        return this.number = number;
    }

    isStart() {
        return this.number === this.start;
    }

    isEnd() {
        return this.number === this.end;
    }

    inRange() {
        return (
            this.number >= this.start &&
            this.number <= this.end
        );
    }
}