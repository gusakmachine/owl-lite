import {State} from "./State";

export class Keyframe
{
    key: number;
    state: State;

    constructor(key: number, posX: number) {
        this.key = key;
        this.state = new State(posX);
    }
}