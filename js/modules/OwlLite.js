//In work
class OwlLite {
    constructor(props) {
        this.stage = props.stage;
        this.group = this.stage.firstElementChild;
        this.progressBar = props.progress;
        this.indicator = this.progressBar.firstElementChild;
        this.delay = props.delay;
        this.duration = props.duration;

        this.items = this.group.children;
        this.count = this.items.length;
        this.item0Rect = this.items[0].getBoundingClientRect();
        this.item1Rect = this.items[1].getBoundingClientRect();
        this.offset = Math.abs(this.item0Rect.right - this.item1Rect.right);
        this.posXMax = this.offset * this.count;

        //if (props.dragging)
            //this.dragging();

        this.clone();
        this.setAnimation();
    }

    // dragging() {
    //     this.dragAndDrop = new DragAndDrop(this.stage, 0, this.posXMax);
    //
    //     this.stage.addEventListener('mouseup', (e) => {
    //         this.matrix = new WebKitCSSMatrix(this.dragAndDrop.style.transform);
    //         let posX = Math.round(this.matrix.m41 / this.offset) * this.offset;
    //         this.stage.style.transition = 'transform 250ms ease-in-out';
    //         TransformRenderer.translateX(this.stage, posX);
    //     });
    // }

    clone() {
        let groupTemplate = this.group.cloneNode(true);

        groupTemplate.classList.add('owl--clone');

        this.stage.prepend(groupTemplate);
        this.stage.append(groupTemplate.cloneNode(true));
    }

    setAnimation() {
        let flow = new FrameFlow();
        let stageAnimation = new PipelineWorker(0, true);
        let progressAnimation = new PipelineWorker(0, true);
        let indicatorAnimation = new PipelineWorker(0, true);

        let moveParams = {
            offset: this.offset,
            posXMax: this.posXMax,
        };

        let stageWait = new Wait(500);
        let progressWait = new Wait(500);
        let indicatorWait = new Wait(500);
        let stageMove = new MoveX(500, this.stage, moveParams);
        let indicatorMove = new MoveXByPercent(500, this.indicator);
        let progressVisibility = new ChangingVisibility(500, this.progressBar);

        let intervalId;

        //this.stage.addEventListener('mouseover', function () {
        // document.addEventListener('keydown', function () {
            //intervalId = setInterval(() => {
            //     if (stageAnimation.cargos[stageAnimation.cargoIndex] instanceof Wait) {
            //         stageWait.pause(true);
            //         indicatorMove.pause(true);
            //         progressVisibility.pause(true);
            //     }
            //}, 15);
        // });

        //this.stage.addEventListener('mouseout', function () {
        // document.addEventListener('keyup', function () {
        //     clearInterval(intervalId);
        //     stageWait.pause(false);
        //     indicatorMove.pause(false);
        //     progressVisibility.pause(false);
        // });

        stageAnimation.put(stageWait);
        stageAnimation.put(stageMove);

        progressAnimation.put(progressVisibility);
        progressAnimation.put(progressWait);

        indicatorAnimation.put(indicatorMove);
        indicatorAnimation.put(indicatorWait);

        flow.put(stageAnimation);
        flow.put(progressAnimation);
        flow.put(indicatorAnimation);

        flow.launch();
    }
}