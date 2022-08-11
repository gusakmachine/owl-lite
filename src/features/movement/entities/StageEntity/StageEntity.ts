import BaseEntity from "../../../../base/entities/BaseEntity/BaseEntity";
import Position from "../../../../base/components/Position/Position";
import TargetStates from "../../../../base/components/TargetStates/TargetStates";

export default class StageEntity extends BaseEntity {
    public position: Position;
    public targetStates: TargetStates;

    constructor(element: HTMLElement)
    {
        super(element);
        const rect = element.getBoundingClientRect();

        this.position = new Position(rect.x, rect.y);
        this.targetStates = new TargetStates(4000);
    }
}