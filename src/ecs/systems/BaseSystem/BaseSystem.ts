import FrameHandler from "../../FrameHandler";

export default class BaseSystem<Entity>
{
    entities: Entity[];

    constructor(entities: Entity[])
    {
        this.entities = entities;
    }

    run(fh: FrameHandler): void
    {
        for (let entity of this.entities) {
            this.handle(fh, entity);
        }
    }

    handle(fh: FrameHandler, entity: Entity): void
    {

    }
}