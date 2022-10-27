import {IntervalProgress} from "../../../lib/components/IntervalProgress/IntervalProgress";
import {StateStep} from "./StateStep";
import {Keyframe} from "./Keyframe";
import {State} from "./State";

export class StateInterval
{
    start: State;
    current: State;
    end: State;
    progress: IntervalProgress;
    step: StateStep;

    constructor(sKeyFrame: Keyframe, eKeyFrame: Keyframe) {
        this.start = new State(sKeyFrame.state.position.x);
        this.current = new State(sKeyFrame.state.position.x);
        this.end = new State(eKeyFrame.state.position.x);
        this.progress = new IntervalProgress(sKeyFrame.key, eKeyFrame.key);
        this.step = new StateStep(eKeyFrame.state.position.x, sKeyFrame.state.position.x);
    }
}