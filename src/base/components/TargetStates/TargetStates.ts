import BaseComponent from "../BaseComponent/BaseComponent";
import Progress from "../Progress/Progress";
import {Target, Targets} from "./types";

export default class TargetStates<State> extends BaseComponent
{
    loop: boolean;
    progress: Progress;
    targets: Targets<State>;
    current: Target<State>;

    constructor(targets: Targets<State>, duration: number)
    {
        super();
        this.loop = true;
        this.progress = new Progress(duration);
        this.targets = targets;
        this.current = this.targets[0];
    }

    setCurrent(index: number)
    {
        this.current = this.targets[index];
    }

    update()
    {
        for (let target of this.targets) {
            if (this.progress.percent < target.key) {
                this.current = target;
                break;
            }
        }
    }
}