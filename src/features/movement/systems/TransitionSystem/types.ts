import BaseEntity from "../../../../base/entities/BaseEntity/BaseEntity";
import Position from "../../../../base/components/Position/Position";
import TargetStates from "../../../../base/components/TargetStates/TargetStates";

export interface Entity extends BaseEntity {
    position: Position
    targetStates: TargetStates
}

export type MousePoint = {
    x: number,
    y: number,
}