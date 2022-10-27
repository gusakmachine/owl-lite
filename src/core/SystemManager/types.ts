import FrameHandler from "../FrameHandler/FrameHandler";

export interface HandlerProperties<Entity> {
    fh: FrameHandler,
    entity: Entity,
}

export type HandlerSystem<Entity> = (props: HandlerProperties<Entity>) => void;