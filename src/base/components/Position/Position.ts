export default class Position
{
    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    set({x, y}: Coords): void
    {
        if (x != undefined)
            this.x = x;
        if (y != undefined)
            this.y = y;
    }
}

type Coords = {
    x?:number, y?: number
};
