import {IntervalProgress} from "../../../lib/components/IntervalProgress/IntervalProgress";
import {State} from "./State";

export class StateStep extends State
{
    constructor(endX: number, startX: number) {
        super((endX - startX) / IntervalProgress.MAX_PERCENT);
    }
}