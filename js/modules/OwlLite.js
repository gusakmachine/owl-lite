//EDIT
class OwlLite {
    constructor(props) {
        this.stage = props.stage;
        this.group = props.group;
        this.delay = props.delay;
        this.transition = props.transition;
        this.duration = this.delay + this.transition;
        // this.cycle = new OwlPipeline(this.duration, this.stage);
        //
        // this.cycle.setCargo(
        //     new OwlCargoMove(0, this.transition, 520)
        // );
        //
        // this.cycle.setCargo(
        //     new OwlCargoWait(this.transition, this.duration)
        // );
    }

    launch() {
        let group_clone = this.group.cloneNode(true);

        group_clone.classList.add('owl--clone');

        this.stage.prepend(group_clone);
        this.stage.append(group_clone.cloneNode(true));

        //this.cycle.launch();
    }
}