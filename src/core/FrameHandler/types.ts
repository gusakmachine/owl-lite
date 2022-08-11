import FrameHandler from "./FrameHandler";

export type Timestamps = {
    previous: number,
    current: number,
}

export type Systems = {
    run: { (fh: FrameHandler): void; },
}[];