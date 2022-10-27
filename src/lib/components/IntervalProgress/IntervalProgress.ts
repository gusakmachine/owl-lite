export class IntervalProgress
{
    static MAX_PERCENT = 100;
    static MIN_PERCENT = 0;

    start: number;
    end: number;
    interval: number;
    percent: number;

    constructor(start: number, end: number)
    {
        this.start = start;
        this.end = end;
        this.interval = end - start;
        this.percent = 0;
    }

    update(number: number)
    {
        this.percent = ((number - this.start) * 100) / this.interval;
    }

    reset()
    {
        this.percent = 0;
    }
}