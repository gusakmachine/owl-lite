import {MousePoint} from "../../models/MoousePoint";

const isPointInRect: isPointInRect = (point, rect) =>
{
    let left = rect.x;
    let right = rect.width + rect.x;
    let top = rect.y;
    let bottom = rect.y + rect.height;

    if (point.x < left || point.x > right)
        return false;
    return point.y > top && point.y < bottom;
}

type isPointInRect = (point: MousePoint, rect: DOMRect) => boolean;

export default isPointInRect;