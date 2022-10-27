export default class TimeProgress
{
    static MAX_PERCENT = 100;
    static MIN_PERCENT = 0;

    loop: boolean;
    percent: number;
    deltaPercent: number;
    duration: number;
    passed: number;

    constructor(duration: number, loop: boolean = false)
    {
        this.loop = loop;
        this.percent = 0;
        this.deltaPercent = 0;
        this.passed = 0;
        this.duration = duration;
    }

    setPercent(percent: number)
    {
        this.deltaPercent = this.percent - percent;
        this.percent = Math.min(
            Math.max(percent, TimeProgress.MIN_PERCENT), TimeProgress.MAX_PERCENT
        );
        this.passed = (this.duration / 100) * this.percent;
    }

    update(deltaTime: number)
    {
        let oldPercent = this.percent;
        this.passed += deltaTime;
        this.percent = (this.passed * 100) / this.duration;
        this.percent = Math.min(
            Math.max(this.percent, TimeProgress.MIN_PERCENT), TimeProgress.MAX_PERCENT
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