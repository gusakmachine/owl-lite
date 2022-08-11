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

    update(deltaTime: number)
    {
        let oldPercent = this.percent;

        this.passed += deltaTime;
        this.percent = (this.passed * 100) / this.duration;

        if (this.percent > Progress.MAX_PERCENT) {
            this.percent = 100;
        } else if (this.percent < Progress.MIN_PERCENT) {
            this.percent = 0;
        }

        this.deltaPercent = this.percent - oldPercent;
    }

    reset()
    {
        this.passed = 0;
        this.percent = 0;
        this.deltaPercent = 0;
    }
}