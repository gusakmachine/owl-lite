import "./styles/index.sass";
import focus from "./environment/utils/Focus/focus";
import FrameHandler from "./core/FrameHandler/FrameHandler";
import StageEntity from "./features/movement/entities/StageEntity/StageEntity";
import Input from "./core/Input/Input";
import {Targets} from "./base/components/TargetStates/types";
import DragAndDropSystem from "./features/movement/systems/DragAndDropSystem/DragAndDropSystem";
import RenderSystem from "./features/movement/systems/RenderSystem/RenderSystem";
import PreTranslate from "./features/movement/systems/PreTranslate/PreTranslate";
import TranslateSystem from "./features/movement/systems/TranslateSystem/TranslateSystem";

type State = {
    transform: {
        translate: {
            x: number,
        },
    },
}

document.addEventListener('DOMContentLoaded', () => {
    let stage = document.querySelector<HTMLElement>('.stage'),
        focusable = document.querySelector<HTMLElement>('.focused');

    if (!stage || !focusable)
        return;

    // focus(stage, focusable);
    
    let offset = -1080;
    let keyframes = [
        {
            key: 0,
            state: {
                transform: {
                    translate: {
                        x: offset,
                    },
                },
            },
        },
        {
            key: 18.75,
            state: {
                transform: {
                    translate: {
                        x: offset,
                    },
                },
            },
        },
        {
            key: 25,
            state: {
                transform: {
                    translate: {
                        x: 240 + offset,
                    },
                },
            },
        },
        {
            key: 43.75,
            state: {
                transform: {
                    translate: {
                        x: 240 + offset,
                    },
                },
            },
        },
        {
            key: 50,
            state: {
                transform: {
                    translate: {
                        x: 480 + offset,
                    },
                },
            },
        },
        {
            key: 68.75,
            state: {
                transform: {
                    translate: {
                        x: 480 + offset,
                    },
                },
            },
        },
        {
            key: 75,
            state: {
                transform: {
                    translate: {
                        x: 720 + offset,
                    },
                },
            },
        },
        {
            key: 93.75,
            state: {
                transform: {
                    translate: {
                        x: 720 + offset,
                    },
                },
            },
        },
        {
            key: 100,
            state: {
                transform: {
                    translate: {
                        x: 960 + offset,
                    },
                },
            },
        },
    ];

    let targets: Targets<State> = [];

    for (let index = 0; index < keyframes.length; index++) {
        let keyframe = keyframes[index];
        let pKeyframe = index? keyframes[index - 1] : keyframe;
        let state = keyframe.state;
        let pState = pKeyframe.state;

        targets.push({
            index: index,
            key: keyframe.key,
            state: state,
            delta: {
                key: keyframe.key - pKeyframe.key,
                state: {
                    transform: {
                        translate: {
                            x: state.transform.translate.x - pState.transform.translate.x,
                        },
                    },
                }
            },
        });
    }

    let input = new Input();
    let stageEntity = new StageEntity(stage, targets, 4000);
    let dragAndDropSystem = new DragAndDropSystem([
        stageEntity,
    ]);
    let preTranslate = new PreTranslate([
        stageEntity
    ]);
    let transitionSystem = new TranslateSystem([
        stageEntity,
    ]);
    let renderSystem = new RenderSystem([
        stageEntity,
    ])
    let fh = new FrameHandler(input, [
        dragAndDropSystem,
        preTranslate,
        transitionSystem,
        renderSystem
    ]);

    fh.run();
});