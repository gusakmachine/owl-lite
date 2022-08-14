import {MousePoint} from "../../types/positions";

const isPointInSquare: IsPointInSquare = (point, rect) =>
{
    let left = rect.x;
    let right = rect.width + rect.x;
    let top = rect.y;
    let bottom = rect.y + rect.height;

    if (point.x < left || point.x > right)
        return false;
    return point.y > top && point.y < bottom;
}

type IsPointInSquare = (point: MousePoint, rect: DOMRect) => boolean;

export default isPointInSquare;