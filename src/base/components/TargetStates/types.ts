export type Target<State> = {
    index: number,
    key: number,
    state: State
    delta: {
        key: number,
        state: State,
    }
}

export type Targets<State> = Target<State>[];