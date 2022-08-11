import BaseEntity from "../../entities/BaseEntity/BaseEntity";
import PositionComponent from "../../components/PositionComponent/PositionComponent";
import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";

export interface Entity extends BaseEntity {
    position: PositionComponent
    animation: AnimationComponent
}

export type MousePoint = {
    x: number,
    y: number,
}