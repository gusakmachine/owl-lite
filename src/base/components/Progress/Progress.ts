export default class Progress
{
    static MAX_PERCENT = 100;
    static MIN_PERCENT = 0;

    percent: number;
    deltaPercent: number;
    duration: number;
    passed: number;

    constructor(duration: number)
    {
        this.percent = 0;
        this.deltaPercent = 0;
        this.duration = duration;
        this.passed = 0;
    }

    setPercent(percent: number)
    {
        this.deltaPercent = this.percent - percent;
        this.percent = Math.min(
            Math.max(percent, Progress.MIN_PERCENT), Progress.MAX_PERCENT
        );
        this.passed = (this.duration / 100) * this.percent;
    }

    update(deltaTime: number)
    {
        let oldPercent = this.percent;
        this.passed += deltaTime;
        this.percent = (this.passed * 100) / this.duration;
        this.percent = Math.min(
            Math.max(this.percent, Progress.MIN_PERCENT), Progress.MAX_PERCENT
        );
        this.deltaPercent = this.percent - oldPercent;
    }

    reset()
    {
        this.passed = 0;
        this.percent = 0;
        this.deltaPercent = 0;
    }
}