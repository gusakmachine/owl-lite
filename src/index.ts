import "./styles/index.sass";
import FrameHandler from "./core/FrameHandler/FrameHandler";
import Input from "./core/Input/Input";
import {createOwlCarousel} from "./features/OwlCarousel";

document.addEventListener('DOMContentLoaded', () => {
    const input = new Input();

    const fh = new FrameHandler(input, [
        ...createOwlCarousel(),
    ]);

    fh.run();
});