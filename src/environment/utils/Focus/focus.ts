const focus: Focus = (stage, focusable) =>
{
    let bodyWidth = document.body.clientWidth;
    let focusedRect = focusable.getBoundingClientRect();
    let focusedWidth = focusedRect.width;
    let bodyCenterXPos = (bodyWidth / 2) - (focusedWidth / 2);
    let focusedOffset = Math.round(bodyCenterXPos - focusedRect.x);

    stage.style.transform = `translate3d(${focusedOffset}px, 0px, 0px)`;
}

export type Focus = (stage:HTMLElement, focusable:HTMLElement) => void;

export default focus;