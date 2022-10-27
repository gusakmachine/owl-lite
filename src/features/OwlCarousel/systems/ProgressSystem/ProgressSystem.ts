import BaseEntity from "../../../../lib/entities/BaseEntity/BaseEntity";
import TimeProgress from "../../../../lib/components/TimeProgress/TimeProgress";
import {HandlerSystem} from "../../../../core/SystemManager/types";

export const ProgressSystem: HandlerSystem<ProgressSystemEntity> = (props) =>
{
    const {fh, entity} = props;
    const {progress} = entity;
    const {loop, percent} = entity.progress;

    if (loop && percent === TimeProgress.MAX_PERCENT) {
        progress.reset();
    } else {
        progress.update(fh.deltaTime);
    }
}


export interface ProgressSystemEntity extends BaseEntity {
    progress: TimeProgress,
}