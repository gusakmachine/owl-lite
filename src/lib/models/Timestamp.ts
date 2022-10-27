export class Timestamp
{
    previous: number;
    current: number;

    constructor(previous: number, current: number) {
        this.previous = previous;
        this.current = current;
    }
}