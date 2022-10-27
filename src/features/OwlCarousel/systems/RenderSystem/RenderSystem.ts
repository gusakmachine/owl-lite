import BaseEntity from "../../../../lib/entities/BaseEntity/BaseEntity";
import Position from "../../../../lib/components/Position/Position";
import {HandlerSystem} from "../../../../core/SystemManager/types";

export const RenderSystem: HandlerSystem<RenderSystemEntity> = (props) =>
{
    const {entity} = props;
    const {element, position} = entity;
    const style = element.style;

    style.transform = `translate3d(${position.x}px, ${position.y}px, 0px)`;
}

export interface RenderSystemEntity extends BaseEntity {
    position: Position,
}