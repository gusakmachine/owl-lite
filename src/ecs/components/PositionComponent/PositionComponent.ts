import BaseComponent from "../BaseComponent/BaseComponent";

export default class PositionComponent extends BaseComponent
{
    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        super();
        this.x = x;
        this.y = y;
    }

    read(element: HTMLElement): void
    {
        let {x, y} = element.getBoundingClientRect();
        this.x = x;
        this.y = y;
    }

    set({x, y}: Coords): void
    {
        if (x)
            this.x = x;
        if (y)
            this.y = y;
    }

    move({x, y}: Coords): void
    {
        if (x)
            this.x += x;
        if (y)
            this.y += y;
    }
}

type Coords = {
    x?:number, y?: number
};