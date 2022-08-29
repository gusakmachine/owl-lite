import Position from "../../../../../base/components/Position/Position";
import targetStates from "../../../../../base/components/TargetStates/TargetStates";
import {State} from "../../../../types";

const computePosX = (position: Position, targetStates: targetStates<State>): number =>
{
    const percent = targetStates.progress.percent;

    const cKey = targetStates.current.key;
    const cPosX = targetStates.current.state.transform.translate.x;

    const cDeltaTranslateX = targetStates.current.delta.state.transform.translate.x;
    const cDeltaPercent = targetStates.current.delta.key;

    const pTargetIndex = (targetStates.current.index - 1) > -1? targetStates.current.index - 1 : 0;
    const pTarget = targetStates.targets[pTargetIndex];
    const startPosX = pTarget.state.transform.translate.x;

    const distTraveledNum = cDeltaPercent - (cKey - percent);
    const distTraveledPer = (distTraveledNum * 100) / cDeltaPercent;
    const distTraveledPos = (cDeltaTranslateX / 100) * distTraveledPer;
    const posX = startPosX + distTraveledPos;

    if (cDeltaTranslateX < 0) {
        if (posX > cPosX) {
            return posX;
        }
    } else if (cDeltaTranslateX > 0) {
        if (posX < cPosX) {
            return posX;
        }
    }

    return cPosX;
}

export default computePosX;