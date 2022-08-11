import BaseEntity from "../BaseEntity/BaseEntity";
import PositionComponent from "../../components/PositionComponent/PositionComponent";
import AnimationComponent from "../../components/AnimationComponent/AnimationComponent";

let offset = -1080
let keyframes = [
    {
        key: 0,
        transform: {
            translate: {
                x: offset,
            },
        },
    },
    {
        key: 18.75,
        transform: {
            translate: {
                x: offset,
            },
        },
    },
    {
        key: 25,
        transform: {
            translate: {
                x: 240 + offset,
            },
        },
    },
    {
        key: 43.75,
        transform: {
            translate: {
                x: 240 + offset,
            },
        },
    },
    {
        key: 50,
        transform: {
            translate: {
                x: 480 + offset,
            },
        },
    },
    {
        key: 68.75,
        transform: {
            translate: {
                x: 480 + offset,
            },
        },
    },
    {
        key: 75,
        transform: {
            translate: {
                x: 720 + offset,
            },
        },
    },
    {
        key: 93.75,
        transform: {
            translate: {
                x: 720 + offset,
            },
        },
    },
    {
        key: 100,
        transform: {
            translate: {
                x: 960 + offset,
            },
        },
    },
];

export default class StageEntity extends BaseEntity {
    public position: PositionComponent;
    public animation: AnimationComponent;

    constructor(element: HTMLElement)
    {
        super(element);
        let rect = element.getBoundingClientRect();

        this.position = new PositionComponent(rect.x, rect.y);
        this.animation = new AnimationComponent(4000, keyframes, true);
    }
}