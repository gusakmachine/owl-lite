//In work
class DragAndDrop {
    constructor(el, minPosX, maxPosX) {
        this.el = el;
        this.minPosX = minPosX;
        this.maxPosX = maxPosX;
        this.style = window.getComputedStyle(this.el);
        this.matrix = null;
        this.startPageX = null;
        this.handlers = {
            mousedown: (e) => {this.mousedown(e)},
            mouseup: (e) => {this.mouseup(e)},
            mousemove : (e) => {this.mousemove(e)},
        }

        this.el.addEventListener('mousedown', this.handlers.mousedown);
    }

    move(e) {
        let local = this.matrix.m41;
        let posX = (local + (this.startPageX - e.pageX) * -1);

        if (posX < this.minPosX)
            posX = posX + this.maxPosX;
        else if (posX > this.maxPosX)
            posX = posX - this.maxPosX;

        TransformRenderer.translateX(this.el, posX);
    }

    mousemove(e) {
        this.move(e);
    }

    mouseup(e) {
        document.removeEventListener('mousemove', this.handlers.mousemove);
        this.el.removeEventListener('mouseup', this.handlers.mouseup);
    }

    mousedown = (e) => {
        this.startPageX = e.pageX;
        this.matrix = new WebKitCSSMatrix(this.style.transform);
        document.addEventListener('mousemove', this.handlers.mousemove);
        this.el.style.transition = 'none';
        this.el.addEventListener('mouseup', this.handlers.mouseup);
    }
}