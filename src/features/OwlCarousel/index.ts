import OwlEntity from "./entities/OwlEntity";
import SystemManager from "../../core/SystemManager/SystemManager";
import {TranslateSystem} from "./systems/TranslateSystem/TranslateSystem";
import {TargetStateSystem} from "./systems/TargetStateSystem/TargetStateSystem";
import {ProgressSystem} from "./systems/ProgressSystem/ProgressSystem";
import {RenderSystem} from "./systems/RenderSystem/RenderSystem";

export const createOwlCarousel = (): SystemManager[] => {
    const stage = document.querySelector<HTMLElement>('.stage'),
        progressBar = document.querySelector<HTMLElement>('.progress-bar'),
        progressBody = document.querySelector<HTMLElement>('.progress-body'),
        focusable = document.querySelector<HTMLElement>('.focused');

    if (!stage || !progressBar || !progressBody || !focusable)
        throw new Error('Elements not found');

    const owlEntity = new OwlEntity(stage, progressBar, progressBody, focusable);

    const translateSystem = new SystemManager(TranslateSystem, [owlEntity]);
    const targetStateSystem = new SystemManager(TargetStateSystem, [owlEntity]);
    const progressSystem = new SystemManager(ProgressSystem, [owlEntity]);
    const renderSystem = new SystemManager(RenderSystem, [owlEntity]);

    return [
        translateSystem, targetStateSystem, progressSystem, renderSystem,
    ];
}