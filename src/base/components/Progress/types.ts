import Progress from "./Progress";

export type Update = (progress: Progress, deltaTime: number) => void;
export type Reset = (progress: Progress) => void;