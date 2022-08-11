import PositionComponent from "../../../components/PositionComponent/PositionComponent";
import AnimationComponent from "../../../components/AnimationComponent/AnimationComponent";

const computeX: ComputeX = (position, animation) =>
{
    const progress = animation.progress;
    const percent = progress.percent;
    const dPercent = progress.deltaPercent;
    const tPercent = animation.step.target.key;
    const sDeltaTranslateX = animation.step.delta.transform.translate.x;
    const sDeltaPercent = animation.step.delta.key;
    const posX = position.x + (sDeltaTranslateX / sDeltaPercent) * dPercent;

    if (percent > tPercent || sDeltaPercent === 0 || posX > animation.step.target.transform.translate.x) {
        return animation.step.target.transform.translate.x;
    }
    return posX;
}

type ComputeX = (position: PositionComponent, animation: AnimationComponent) => number

export default computeX;