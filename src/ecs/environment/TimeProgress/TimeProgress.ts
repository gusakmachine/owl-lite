import BaseComponent from "../../components/BaseComponent/BaseComponent";

export default class TimeProgress extends BaseComponent
{
    duration: number = 0;
    passed: number = 0;
    deltaPercent: number = 0;
    percent: number = 0;

    constructor(duration: number)
    {
        super();
        this.duration = duration;
    }

    update(deltaTime: number): void
    {
        let oldPercent = this.percent;

        this.passed += deltaTime;
        this.percent = (this.passed * 100) / this.duration;
        this.deltaPercent = this.percent - oldPercent;

        if (this.percent > 100)
            this.percent = 100;
        else if (this.percent < 0)
            this.percent = 0;
    }

    reset(): void
    {
        this.passed = 0;
        this.deltaPercent = 0;
        this.percent = 0;
    }
}