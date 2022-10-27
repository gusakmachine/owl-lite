import {StateInterval} from "../models/StateInterval";
import {Keyframe} from "../models/Keyframe";

export class TargetStates
{
    controllers: StateInterval[] = [];
    current: StateInterval;
    length: number;
    index: number;

    constructor(keyframes: Keyframe[]) {
        for (let index = 1; index < keyframes.length; index++) {
            const sKeyframe = keyframes[index - 1];
            const eKeyframe = keyframes[index];

            this.controllers.push(
                new StateInterval(sKeyframe, eKeyframe)
            );
        }

        this.current = this.controllers[0];
        this.length = this.controllers.length - 1;
        this.index =  0;
    }
}