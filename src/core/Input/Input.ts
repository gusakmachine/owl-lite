import MouseCollector from "./MouseCollector/MouseCollector";

export default class Input
{
    mouse: MouseCollector;

    constructor() {
        this.mouse = new MouseCollector();
    }
}
