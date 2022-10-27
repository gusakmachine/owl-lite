import Position from "../../../lib/components/Position/Position";

export class State
{
    position: Position;

    constructor(x: number) {
        this.position = new Position(x, 0);
    }
}