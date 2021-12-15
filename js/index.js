document.addEventListener("DOMContentLoaded", function () {
    let stage = document.querySelector('.owl-stage');
    let groupClone = document.querySelector('.owl-group').cloneNode(true);
    let progressBar = document.querySelector('.owl-progress-bar');
    let indicator = document.querySelector('.owl-progress__indicator');

    groupClone.classList.add('owl--clone');
    stage.prepend(groupClone);
    stage.append(groupClone.cloneNode(true));

    let globalStopwatch = new Stopwatch();
    let pipeline = new Pipeline(true);
    let cycle = new Cycle(globalStopwatch, [pipeline]);

    let moveParams = {
        direction: 1,
        offset: 520,
        posXMax: 2080,
    };
    let moveParams2 = {
        direction: 1,
        offset: 100,
        posXMax: 100,
        type: '%',
    };
    let stageMove = new CargoTranslate(500, 1000, stage, moveParams);
    let indicatorProgress = new CargoTranslate(0, 500, indicator, moveParams2);
    let progressBarVisibility = new CargoVisibility(0, 500, progressBar);

    pipeline.put(stageMove);
    pipeline.put(progressBarVisibility);
    pipeline.put(indicatorProgress);

    cycle.launch();

    document.addEventListener('click', function () {
        pipeline.pause();
    });
});