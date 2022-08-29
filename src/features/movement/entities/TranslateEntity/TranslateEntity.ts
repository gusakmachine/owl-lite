import BaseEntity from "../../../../base/entities/BaseEntity/BaseEntity";
import Position from "../../../../base/components/Position/Position";
import TargetStates from "../../../../base/components/TargetStates/TargetStates";
import {Targets} from "../../../../base/components/TargetStates/types";
import PositionsHistory from "../../components/PositionsHistory/PositionsHistory";
import TranslateFlags from "../../components/TranslateFlags/TranslateFlags";

export default class TranslateEntity<State> extends BaseEntity {
    public position: Position;
    public positionsHistory: PositionsHistory;
    public targetStates: TargetStates<State>;
    public translateFlags: TranslateFlags;

    constructor(element: HTMLElement, targets: Targets<State>, duration: number, x: number = 0, y: number = 0)
    {
        super(element);
        this.position = new Position(x, y);
        this.positionsHistory = new PositionsHistory();
        this.targetStates = new TargetStates(targets, duration);
        this.translateFlags = new TranslateFlags();
    }
}