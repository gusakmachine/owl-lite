import BaseSystem from "../../../../base/systems/BaseSystem/BaseSystem";
import {Entity} from "../../../types";
import FrameHandler from "../../../../core/FrameHandler/FrameHandler";
import isPointInSquare from "../../../../environment/utils/IsPointInSquare/isPointInSquare";

export default class PreTranslate extends BaseSystem<Entity>
{
    handle(fh: FrameHandler, entity: Entity)
    {
        const {element, position, positionsHistory} = entity;
        const oldPosX = positionsHistory.oldPosX;
        const mousePosition = fh.input.mouse.position;
        const stageRect = element.getBoundingClientRect();

        if (isPointInSquare(mousePosition, stageRect))
            return;
        if (oldPosX === undefined || oldPosX === position.x)
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