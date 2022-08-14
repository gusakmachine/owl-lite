import {Entity} from "../../../types";
import FrameHandler from "../../../../core/FrameHandler/FrameHandler";
import BaseSystem from "../../../../base/systems/BaseSystem/BaseSystem";
import isPointInSquare from "../../../../environment/utils/IsPointInSquare/isPointInSquare";
import computePosX from "./utils/computePosX";

export default class TranslateSystem extends BaseSystem<Entity>
{
    handle(fh: FrameHandler, entity: Entity)
    {
        const {element, position, targetStates, positionsHistory} = entity;
        const oldPosX = positionsHistory.oldPosX;
        const progress = targetStates.progress;
        const mousePosition = fh.input.mouse.position;
        const stageRect = element.getBoundingClientRect();

        if (isPointInSquare(mousePosition, stageRect))
            return;
        if (oldPosX !== undefined && oldPosX !== position.x)
            return;

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