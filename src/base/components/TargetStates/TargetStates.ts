import BaseComponent from "../BaseComponent/BaseComponent";
import Progress from "../Progress/Progress";
import {Target, Targets} from "./types";

export default class TargetStates extends BaseComponent
{
    loop: boolean;
    offset: number;
    progress: Progress;
    targets: Targets;
    current: Target;

    constructor(duration: number) {
        super();

        this.loop = true;
        this.offset = -1080;
        this.progress = new Progress(duration);
        this.targets = [];

        let keyframes = [
            {
                key: 0,
                state: {
                    transform: {
                        translate: {
                            x: this.offset,
                        },
                    },
                },
            },
            {
                key: 18.75,
                state: {
                    transform: {
                        translate: {
                            x: this.offset,
                        },
                    },
                },
            },
            {
                key: 25,
                state: {
                    transform: {
                        translate: {
                            x: 240 + this.offset,
                        },
                    },
                },
            },
            {
                key: 43.75,
                state: {
                    transform: {
                        translate: {
                            x: 240 + this.offset,
                        },
                    },
                },
            },
            {
                key: 50,
                state: {
                    transform: {
                        translate: {
                            x: 480 + this.offset,
                        },
                    },
                },
            },
            {
                key: 68.75,
                state: {
                    transform: {
                        translate: {
                            x: 480 + this.offset,
                        },
                    },
                },
            },
            {
                key: 75,
                state: {
                    transform: {
                        translate: {
                            x: 720 + this.offset,
                        },
                    },
                },
            },
            {
                key: 93.75,
                state: {
                    transform: {
                        translate: {
                            x: 720 + this.offset,
                        },
                    },
                },
            },
            {
                key: 100,
                state: {
                    transform: {
                        translate: {
                            x: 960 + this.offset,
                        },
                    },
                },
            },
        ];

        for (let index = 0; index < keyframes.length; index++) {
            let keyframe = keyframes[index];
            let pKeyframe = index? keyframes[index - 1] : keyframe;
            let state = keyframe.state;
            let pState = pKeyframe.state;

            this.targets.push({
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

        this.current = this.targets[0];
    }

    update()
    {
        for (let target of this.targets) {
            if (this.progress.percent < target.key) {
                this.current = target;
                break;
            }
        }
    }
}