import BaseSystem from "../BaseSystem/BaseSystem";
import FrameHandler from "../../FrameHandler";
import isPointInSquare from "../../environment/Utils/isPointInSquare/isPointInSquare";
import computeX from "./utils/computeX";
import {Entity} from "./types";

export default class TranslateSystem extends BaseSystem<Entity>
{
    handle(fh: FrameHandler, entity: Entity)
    {
        const element = entity.element;
        const mousePosition = fh.input.mouse.position;
        const stageRect = element.getBoundingClientRect();

        if (isPointInSquare(mousePosition, stageRect))
            return;

        const position = entity.position;
        const animation = entity.animation;
        const style = element.style;
        const x = computeX(position, animation);

        position.set({ x: x });

        console.log(
            // 'Passed: ' + progress.passed,
            '| Percent: ' + animation.progress.percent.toFixed(3),
            // '| dPercent: ' + progress.deltaPercent.toFixed(3),
            // '| TKey: ' + animation.step.target.key,
            '| Key: ' + animation.step.target.transform.translate.x,
            '| X: ' + x,
            // `| MousePos. X:${fh.input.mouse.position.x} Y:${fh.input.mouse.position.y}`,
        );

        style.transform = `translate3d(${position.x}px, ${position.y}px, 0px)`;

        animation.update(fh.deltaTime);
    }
}