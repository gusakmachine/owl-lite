import FrameHandler from "../FrameHandler/FrameHandler";
import BaseEntity from "../../lib/entities/BaseEntity/BaseEntity";

export default class SystemManager<Entity extends BaseEntity = BaseEntity>
{
    handler: Function;
    entities: Entity[];

    constructor(handler: Function, entities: Entity[])
    {
        this.handler = handler;
        this.entities = entities;
    }

    run(fh: FrameHandler): void
    {
        for (let entity of this.entities) {
            this.handler({fh, entity});
        }
    }
}