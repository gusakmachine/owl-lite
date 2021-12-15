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
        let groupClone = this.group.cloneNode(true);

        groupClone.classList.add('owl--clone');

        this.stage.prepend(groupClone);
        this.stage.append(groupClone.cloneNode(true));

        //this.cycle.launch();

        // let stageOffset = new OwlCargoOffset(500, 1000, stage, 520);
        // let progressBarOffset = new OwlCargoOffset(500, 1000, progressBar, 520);
        // let progressBarVisibility = new OwlCargoVisibility(500, 1000, progressBar);
        // let indicatorProgress = new OwlCargoProgress(0, 500, indicator);

        //pipeline.put(stageOffset);
        //pipeline.put(progressBarVisibility);
        //pipeline.put(indicatorProgress);

        // let stage = document.querySelector('.owl-stage');
        // let groupClone = document.querySelector('.owl-group').cloneNode(true);
        // let progressBar = document.querySelector('.owl-progress-bar');
        // let indicator = document.querySelector('.owl-progress__indicator');
        //
        // groupClone.classList.add('owl--clone');
        // stage.prepend(groupClone);
        // stage.append(groupClone.cloneNode(true));

    }
}