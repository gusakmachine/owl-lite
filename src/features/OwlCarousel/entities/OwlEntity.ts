import BaseEntity from "../../../lib/entities/BaseEntity/BaseEntity";
import TimeProgress from "../../../lib/components/TimeProgress/TimeProgress";
import Position from "../../../lib/components/Position/Position";
import {TargetStates} from "../components/TargetStates";
import {Keyframe} from "../models/Keyframe";

export default class OwlEntity extends BaseEntity
{
    offset: number;
    itemsCount: number;
    duration: number;
    position: Position;
    progress: TimeProgress;
    tsm: TargetStates;

    constructor(stage: HTMLElement, progressBar: HTMLElement, progressBody: HTMLElement, focusable: HTMLElement)
    {
        super(stage);

        this.position = new Position(0, 0);
        this.offset = -1080;
        this.itemsCount = 4;
        this.duration = 4000;

        //move intervals
        const stageKeyframes: Keyframe[] = [
            new Keyframe(0, this.offset),

            new Keyframe(18.75, this.offset),
            new Keyframe(25, 240 + this.offset),

            new Keyframe(43.75, 240 + this.offset),
            new Keyframe(50, 480 + this.offset),

            new Keyframe(68.75, 480 + this.offset),
            new Keyframe(75, 720 + this.offset),

            new Keyframe(93.75, 720 + this.offset),
            new Keyframe(100, 960 + this.offset),
        ];

        this.tsm = new TargetStates(stageKeyframes);
        this.progress = new TimeProgress(this.duration, true);
    }
}