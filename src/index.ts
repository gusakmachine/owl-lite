import "./styles/index.sass";
import FrameHandler from "./core/FrameHandler/FrameHandler";
import Input from "./core/Input/Input";
import {Targets} from "./base/components/TargetStates/types";
import DragAndDropSystem from "./features/movement/systems/DragAndDropSystem/DragAndDropSystem";
import RenderSystem from "./features/movement/systems/RenderSystem/RenderSystem";
import PreTranslateSystem from "./features/movement/systems/PreTranslateSystem/PreTranslateSystem";
import TranslateSystem from "./features/movement/systems/TranslateSystem/TranslateSystem";
import {State} from "./features/types";
import TranslateEntity from "./features/movement/entities/TranslateEntity/TranslateEntity";

type Keyframe = {
    key: number,
    state: {
        transform: {
            translate: {
                x: number,
            },
        },
    },
}

type Keyframes = Keyframe[];

function keyframesToTargetState(keyframes: Keyframes): Targets<State> {
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

    return targets;
}

document.addEventListener('DOMContentLoaded', () => {
    let stage = document.querySelector<HTMLElement>('.stage'),
        progressBody = document.querySelector<HTMLElement>('.progress-body'),
        focusable = document.querySelector<HTMLElement>('.focused');

    if (!stage || !progressBody || !focusable)
        return;

    // focus(stage, focusable);

    let offset = -1080;
    let stageKeyframes = [
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
    let progressKeyframes = [
        {
            key: 0,
            state: {
                transform: {
                    translate: {
                        x: 0,
                    },
                },
            },
        },
        {
            key: 75,
            state: {
                transform: {
                    translate: {
                        x: 180,
                    },
                },
            },
        },
        {
            key: 76,
            state: {
                transform: {
                    translate: {
                        x: 180,
                    },
                },
            },
        },
        {
            key: 77,
            state: {
                transform: {
                    translate: {
                        x: 0,
                    },
                },
            },
        },
        {
            key: 100,
            state: {
                transform: {
                    translate: {
                        x: 0,
                    },
                },
            },
        },
    ];

    let input = new Input();

    let stageEntity = new TranslateEntity(
        stage, keyframesToTargetState(stageKeyframes), 4000
    );
    let progressBarEntity = new TranslateEntity(
        progressBody, keyframesToTargetState(progressKeyframes), 1000
    );

    let dragAndDropSystem = new DragAndDropSystem([
        stageEntity
    ]);
    let preTranslateSystem = new PreTranslateSystem([
        progressBarEntity, stageEntity
    ]);
    let translateSystem = new TranslateSystem([
        progressBarEntity, stageEntity
    ]);
    let renderSystem = new RenderSystem([
        progressBarEntity, stageEntity
    ]);

    let fh = new FrameHandler(input, [
        dragAndDropSystem,
        preTranslateSystem,
        translateSystem,
        renderSystem
    ]);

    fh.run();
});