import "./styles/index.sass";
import focus from "./utils/focus";
import FrameHandler from "./ecs/FrameHandler";
import StageEntity from "./ecs/entities/StageEntity/StageEntity";
import TranslateSystem from "./ecs/systems/TranslateSystem/TranslateSystem";
import Input from "./ecs/environment/Input/Input";

document.addEventListener('DOMContentLoaded', () => {
    let stage = document.querySelector<HTMLElement>('.stage'),
        focusable = document.querySelector<HTMLElement>('.focused');

    if (!stage || !focusable)
        return;

    // focus(stage, focusable);

    let input = new Input();
    let stageEntity = new StageEntity(stage);
    let translateSystem = new TranslateSystem([
        stageEntity,
    ]);
    let fh = new FrameHandler(input, [
        translateSystem,
    ]);

    fh.run();
});