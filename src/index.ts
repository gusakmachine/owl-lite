import "./styles/index.sass";
import focus from "./environment/utils/Focus/focus";
import FrameHandler from "./core/FrameHandler/FrameHandler";
import StageEntity from "./features/movement/entities/StageEntity/StageEntity";
import TransitionSystem from "./features/movement/systems/TransitionSystem/TransitionSystem";
import Input from "./core/Input/Input";

document.addEventListener('DOMContentLoaded', () => {
    let stage = document.querySelector<HTMLElement>('.stage'),
        focusable = document.querySelector<HTMLElement>('.focused');

    if (!stage || !focusable)
        return;

    // focus(stage, focusable);

    let input = new Input();
    let stageEntity = new StageEntity(stage);
    let transitionSystem = new TransitionSystem([
        stageEntity,
    ]);
    let fh = new FrameHandler(input, [
        transitionSystem,
    ]);

    fh.run();
});