export interface Keyframe {
    key: number,
    transform: {
        translate: {
            x: number,
        }
    },
}

export type  Keyframes = Keyframe[]

export interface Step {
    index: number,
    target: Keyframe,
    delta: Keyframe
}

export type Steps = Step[]