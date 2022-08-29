import {Entity} from "../../../types";
import FrameHandler from "../../../../core/FrameHandler/FrameHandler";
import BaseSystem from "../../../../base/systems/BaseSystem/BaseSystem";
import computePosX from "./utils/computePosX";

export default class TranslateSystem extends BaseSystem<Entity>
{
    handle(fh: FrameHandler, entity: Entity)
    {
        const {position, targetStates, positionsHistory, translateFlags} = entity;
        const progress = targetStates.progress;

        if (translateFlags.isPointInRect)
            return;
        if (translateFlags.outOfSync)
            return;

        //DON'T CHANGE ORDER
        targetStates.update();
        position.set({ x: computePosX(position, targetStates) });
        positionsHistory.setOldPosX(position.x);

        // console.log(
        //     '| Percent: ' + progress.percent.toFixed(3),
        //     '| Key: ' + targetStates.current.key,
        //     '| TargetX: ' + targetStates.current.state.transform.translate.x,
        //     '| X: ' + position.x.toFixed(3),
        // );

        if (targetStates.loop && progress.percent === 100) {
            progress.reset();
        } else {
            progress.update(fh.deltaTime);
        }
    }
}