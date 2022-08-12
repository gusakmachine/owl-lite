import BaseSystem from "../../../../base/systems/BaseSystem/BaseSystem";
import {Entity} from "../../../types";
import FrameHandler from "../../../../core/FrameHandler/FrameHandler";
import isPointInSquare from "../../../../environment/utils/IsPointInSquare/isPointInSquare";

export default class DragAndDropSystem extends BaseSystem<Entity>
{
    handle(fh: FrameHandler, entity: Entity)
    {
        const {element, positionsHistory} = entity;
        const oldMousePosX = positionsHistory.oldMousePosX;
        const mouse = fh.input.mouse;
        const mousePosition = mouse.position;
        const stageRect = element.getBoundingClientRect();
        let offset = 0;

        if (!isPointInSquare(mousePosition, stageRect)) {
            return;
        }

        const position = entity.position;
        const mouseDown = mouse.down;

        if (mouseDown) {
            if (typeof oldMousePosX === 'number')
                offset = mousePosition.x - oldMousePosX;

            positionsHistory.setOldMousePosX(mousePosition.x);
        } else {
            positionsHistory.setOldMousePosX(null);
        }

        position.set({ x: position.x + offset });
    }
}
