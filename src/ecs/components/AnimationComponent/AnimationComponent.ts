import BaseComponent from "../BaseComponent/BaseComponent";
import TimeProgress from "../../environment/TimeProgress/TimeProgress";
import {Keyframes, Step, Steps} from "./types";

export default class AnimationComponent extends BaseComponent
{
    public progress: TimeProgress;
    public duration: number;
    public steps: Steps;
    public step: Step;
    public infinite: boolean;

    constructor(duration: number, keyframes: Keyframes, infinite?: boolean)
    {
        super();
        this.duration = duration;
        this.progress = new TimeProgress(duration);
        this.infinite = !!infinite;
        this.steps = [];

        for (let index = 0; index < keyframes.length; index++) {
            let keyframe = keyframes[index];
            let pKeyframe = index? keyframes[index - 1] : keyframe;

            this.steps.push({
                index: index,
                target: keyframe,
                delta: {
                    key: keyframe.key - pKeyframe.key,
                    transform: {
                        translate: {
                            x: keyframe.transform.translate.x - pKeyframe.transform.translate.x,
                        },
                    },
                },
            });
        }

        this.step = this.steps[0];
    }

    update(deltaTime: number)
    {
        if (this.infinite && this.progress.percent === 100) {
            this.progress.reset();
        } else {
            this.progress.update(deltaTime);
        }

        for (let step of this.steps) {
            if (this.progress.percent < step.target.key) {
                this.step = step;
                break;
            }
        }
    }
}