import BaseComponent from "../../../../base/components/BaseComponent/BaseComponent";

export default class TranslateFlags extends BaseComponent
{
    isPointInRect: boolean = false;
    outOfSync: boolean = false;

    setIsPointInRect(value: boolean)
    {
        return this.isPointInRect = value;
    }

    setOutOfSync(value: boolean)
    {
        return this.outOfSync = value;
    }
}