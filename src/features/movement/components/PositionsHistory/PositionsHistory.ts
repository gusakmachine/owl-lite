import BaseComponent from "../../../../base/components/BaseComponent/BaseComponent";

export default class PositionsHistory extends BaseComponent
{
    oldMousePosX: number | undefined | null;
    oldPosX: number | undefined;

    setOldMousePosX(value: number | null)
    {
        this.oldMousePosX = value;
    }

    setOldPosX(value: number)
    {
        this.oldPosX = value;
    }
}