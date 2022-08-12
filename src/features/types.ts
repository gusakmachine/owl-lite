import BaseEntity from "../base/entities/BaseEntity/BaseEntity";
import Position from "../base/components/Position/Position";
import TargetStates from "../base/components/TargetStates/TargetStates";
import PositionsHistory from "./movement/Components/PositionsHistory/PositionsHistory";

export interface Entity extends BaseEntity {
    position: Position
    targetStates: TargetStates
    positionsHistory: PositionsHistory
}

export type MousePoint = {
    x: number
    y: number
}