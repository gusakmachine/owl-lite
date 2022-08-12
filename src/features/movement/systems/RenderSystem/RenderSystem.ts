import BaseSystem from "../../../../base/systems/BaseSystem/BaseSystem";
import {Entity} from "../../../types";
import FrameHandler from "../../../../core/FrameHandler/FrameHandler";

export default class RenderSystem extends BaseSystem<Entity>
{
    handle(fh: FrameHandler, entity: Entity)
    {
        const {element, position} = entity;
        const style = element.style;

        style.transform = `translate3d(${position.x}px, ${position.y}px, 0px)`;
    }
}