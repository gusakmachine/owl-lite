import {Entity} from "./types";
import computeX from "../../utils/computeX";
import FrameHandler from "../../../../core/FrameHandler/FrameHandler";
import BaseSystem from "../../../../base/systems/BaseSystem/BaseSystem";
import isPointInSquare from "../../../../environment/utils/IsPointInSquare/isPointInSquare";

export default class TransitionSystem extends BaseSystem<Entity>
{
    handle(fh: FrameHandler, entity: Entity)
    {
        const element = entity.element;
        const mousePosition = fh.input.mouse.position;
        const stageRect = element.getBoundingClientRect();

        if (isPointInSquare(mousePosition, stageRect))
            return;

        const position = entity.position;
        const targetState = entity.targetStates;
        const progress = targetState.progress;
        const style = element.style;

        targetState.update();

        const x = computeX(position, targetState);

        position.set({x: x});

        console.log(
            // 'Passed: ' + progress.passed,
            '| Percent: ' + progress.percent.toFixed(3),
            // '| dPercent: ' + progress.deltaPercent.toFixed(3),
            // '| TKey: ' + translate.step.target.key,
            '| Key: ' + targetState.current.key,
            '| X: ' + x,
            // `| MousePos. X:${fh.input.mouse.position.x} Y:${fh.input.mouse.position.y}`,
        );

        style.transform = `translate3d(${position.x}px, ${position.y}px, 0px)`;

        if (targetState.loop && progress.percent === 100) {
            progress.reset();
        } else {
            progress.update(fh.deltaTime);
        }
    }
}