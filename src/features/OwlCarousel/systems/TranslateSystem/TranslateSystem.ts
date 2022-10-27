import BaseEntity from "../../../../lib/entities/BaseEntity/BaseEntity";
import Position from "../../../../lib/components/Position/Position";
import TimeProgress from "../../../../lib/components/TimeProgress/TimeProgress";
import {HandlerSystem} from "../../../../core/SystemManager/types";
import {TargetStates} from "../../components/TargetStates";

export const TranslateSystem: HandlerSystem<TranslateSystemEntity> = (props) =>
{
    const entity = props.entity;
    const {progress, position, tsm} = entity;
    const stateInterval = tsm.current;
    const currentPosition = stateInterval.current.position;
    const startPosition = stateInterval.start.position;
    const stepPosition = stateInterval.step.position;

    currentPosition.x = (
        startPosition.x + stateInterval.progress.percent * stepPosition.x
    );

    position.set(currentPosition);
    stateInterval.progress.update(progress.percent);

    console.log(
        // '| TPercent: ' + tc.progress.percent,
        // '| TKey: ' + tc.progress.end,
        // '| TPosX: ' + tc.end.transform.translate.x,
        // '| X: ' + tc.current.transform.translate.x,
    );
}

export interface TranslateSystemEntity extends BaseEntity {
    progress: TimeProgress,
    position: Position,
    tsm: TargetStates,
}