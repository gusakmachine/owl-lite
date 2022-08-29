import BaseEntity from "../base/entities/BaseEntity/BaseEntity";
import Position from "../base/components/Position/Position";
import TargetStates from "../base/components/TargetStates/TargetStates";
import PositionsHistory from "./movement/components/PositionsHistory/PositionsHistory";
import TranslateFlags from "./movement/components/TranslateFlags/TranslateFlags";

export type State = {
    transform: {
        translate: {
            x: number,
        },
    },
}

export interface Entity extends BaseEntity {
    position: Position
    targetStates: TargetStates<State>
    positionsHistory: PositionsHistory
    translateFlags: TranslateFlags
}