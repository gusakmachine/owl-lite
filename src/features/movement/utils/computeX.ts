import Position from "../../../base/components/Position/Position";
import TargetStates from "../../../base/components/TargetStates/TargetStates";

const computeX = (position: Position, targetState: TargetStates): number =>
{
    const deltaPercent = targetState.progress.deltaPercent;
    const cPosX = targetState.current.state.transform.translate.x;
    const cDeltaTranslateX = targetState.current.delta.state.transform.translate.x;
    const cDeltaPercent = targetState.current.delta.key;

    const posX = position.x + (cDeltaTranslateX / cDeltaPercent) * deltaPercent;

    if (posX < cPosX)
        return posX;
    return cPosX;
}

export default computeX;