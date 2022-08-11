import Input from "./environment/Input/Input";
import {Systems, Timestamps} from "./types";

export default class FrameHandler
{
    input: Input;
    systems: Systems;
    deltaTime: number;
    timestamps: Timestamps;

    constructor(input: Input, systems: Systems)
    {
        this.input = input;
        this.systems = systems;
        this.deltaTime = 0;
        this.timestamps = {
            previous: 0,
            current: 0,
        };
    }

    setTimeStamp(timestamp: number): void
    {
        this.timestamps = {
            previous: this.timestamps.current,
            current: timestamp,
        };
    }

    setDeltaTime(): void
    {
        let {previous, current} = this.timestamps;

        if (previous && current) {
            this.deltaTime = current - previous;
        } else {
            this.deltaTime = 0;
        }
    }

    run(timestamp: number = 0): void
    {
        this.setTimeStamp(timestamp);
        this.setDeltaTime();

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