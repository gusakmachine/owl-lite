import {IntervalProgress} from "../../../../lib/components/IntervalProgress/IntervalProgress";
import BaseEntity from "../../../../lib/entities/BaseEntity/BaseEntity";
import {HandlerSystem} from "../../../../core/SystemManager/types";
import {TargetStates} from "../../components/TargetStates";

export const TargetStateSystem: HandlerSystem<TargetStateSystemEntity> = (props) =>
{
    const {entity} = props;
    const tsm = entity.tsm;
    const nextIndex = tsm.index + 1;
    const stateInterval = tsm.current;

    if (stateInterval.progress.percent < IntervalProgress.MAX_PERCENT)
        return;

    stateInterval.progress.reset();
    tsm.index = (nextIndex > tsm.length) ? 0 : nextIndex;
    tsm.current = tsm.controllers[tsm.index];
}

export interface TargetStateSystemEntity extends BaseEntity {
    tsm: TargetStates,
}