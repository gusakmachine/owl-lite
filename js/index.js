
document.addEventListener("DOMContentLoaded", function () {
    let stage = document.querySelector('.owl-stage'),
        group = stage.querySelector('.owl-group');
    // let owl = new OwlLite({
    //     stage: stage,
    //     group: group,
    //     delay: 500,
    //     transition: 500,
    // });
    //
    // owl.launch();

    let group_clone = group.cloneNode(true);

    group_clone.classList.add('owl--clone');

    stage.prepend(group_clone);
    stage.append(group_clone.cloneNode(true));

    let pipeline = new OwlPipeline(100, stage);
    let cargo = new Cargo(0, 50);
    let cycle = new Cycle(pipeline);

    pipeline.put(cargo);
    cycle.launch();
})