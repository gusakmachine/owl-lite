import BaseEntity from "../../../../base/entities/BaseEntity/BaseEntity";
import Position from "../../../../base/components/Position/Position";
import TargetStates from "../../../../base/components/TargetStates/TargetStates";
import {Targets} from "../../../../base/components/TargetStates/types";
import PositionsHistory from "../../Components/PositionsHistory/PositionsHistory";

export default class StageEntity extends BaseEntity {
    public position: Position;
    public positionsHistory: PositionsHistory;
    public targetStates: TargetStates;

    constructor(element: HTMLElement, targets: Targets, duration: number)
    {
        super(element);
        const rect = element.getBoundingClientRect();

        this.position = new Position(rect.x, rect.y);
        this.positionsHistory = new PositionsHistory();
        this.targetStates = new TargetStates(targets, duration);
    }
}