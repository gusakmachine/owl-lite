import MouseCollector from "./collectors/MouseCollector/MouseCollector";

export default class Input
{
    mouse: MouseCollector;

    constructor() {
        this.mouse = new MouseCollector();
    }
}
