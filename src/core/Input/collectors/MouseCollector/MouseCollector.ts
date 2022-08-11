import {MousePosition} from "../../types";

export default class MouseCollector {
    down: MousePosition | null = null;
    position: MousePosition = { x: 0, y: 0 };

    constructor() {
        document.body.onmousedown = (me) => {
            this.down = {
                x: me.x,
                y: me.y,
            };
        }
        document.body.onmouseup = (me) => {
            this.down = null;
        }
        document.onmousemove = (me) => {
            this.position = {
                x: me.x,
                y: me.y,
            };
        }
    }
}