export type State = {
    transform: {
        translate: {
            x: number,
        },
    },
}

export type Target = {
    index: number,
    key: number,
    state: State
    delta: {
        key: number,
        state: State,
    }
}

export type Targets = Target[];