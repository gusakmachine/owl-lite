import {Targets} from "../../../../../base/components/TargetStates/types";
import {State} from "../../../../types";

const adaptPercent = (targets: Targets<State>, posX: number): number | undefined =>
{
    let minDiff;
    let percent;

    for (let target of targets) {
        let state = target.state;
        let tPosX = state.transform.translate.x;
        let diff = Math.abs(posX - tPosX);

        if (!minDiff || diff < minDiff) {
            percent = target.key;
            minDiff = diff;
        }
    }

    return percent;
}

export default adaptPercent;