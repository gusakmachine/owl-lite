import BaseSystem from "../../../../base/systems/BaseSystem/BaseSystem";
import {Entity} from "../../../types";
import FrameHandler from "../../../../core/FrameHandler/FrameHandler";
import isPointInRect from "../../../../environment/utils/IsPointInRect/IsPointInRect";

export default class PreTranslateSystem extends BaseSystem<Entity>
{
    handle(fh: FrameHandler, entity: Entity)
    {
        const {element, position, positionsHistory, translateFlags} = entity;
        const oldPosX = positionsHistory.oldPosX;
        const mousePosition = fh.input.mouse.position;
        const stageRect = element.getBoundingClientRect();

        translateFlags.setIsPointInRect(isPointInRect(mousePosition, stageRect));
        translateFlags.setOutOfSync(oldPosX !== undefined && oldPosX !== position.x);

        if (translateFlags.isPointInRect)
            return;
        if (!translateFlags.outOfSync || oldPosX === undefined)
            return;

        const direction = oldPosX - position.x;
        let posX: number;

        if (direction > 0) {
            posX = position.x + fh.deltaTime;

            if (posX > oldPosX)
                posX = oldPosX;
        } else {
            posX = position.x - fh.deltaTime;

            if (posX < oldPosX)
                posX = oldPosX;
        }

        position.set({
            x: posX,
        });
    }
}