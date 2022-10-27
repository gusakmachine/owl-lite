import Input from "../Input/Input";
import {Timestamp} from "../../lib/models/Timestamp";
import SystemManager from "../SystemManager/SystemManager";

export default class FrameHandler
{
    input: Input;
    systems: SystemManager[];
    deltaTime: number;
    timestamp: Timestamp;

    constructor(input: Input, systems: SystemManager[])
    {
        this.input = input;
        this.systems = systems;
        this.deltaTime = 0;
        this.timestamp = new Timestamp(0,0);
    }

    setDeltaTime(): void
    {
        let {previous, current} = this.timestamp;

        if (previous && current) {
            this.deltaTime = current - previous;
        } else {
            this.deltaTime = 0;
        }
    }

    setTimeStamp(timestamp: number): void
    {
        this.timestamp = new Timestamp(
            this.timestamp.current,
            timestamp,
        );

        this.setDeltaTime();
    }

    run(timestamp: number = 0): void
    {
        this.setTimeStamp(timestamp);

        if (this.deltaTime) {
            for (let system of this.systems) {
                system.run(this);
            }
        }

        requestAnimationFrame((timestamp: number) => {
            this.run(timestamp);
        });
    }
}