
var owl;

document.addEventListener("DOMContentLoaded", function () {
    owl = new Owl(
        document.getElementById('owl-stage'),
        document.getElementsByClassName('owl-item'),
    );

    owl.staticDirection = owl.direction = -1; // (direction = -1) --> Right to left
    owl.duration = 500;
    owl.addToMaxPrevItem = owl.addToMaxNextItem = 1;

    owl.stage.style = 'transition: all ' + owl.transitionDuration + 'ms ease-in-out';

    if (owl.items.length > 2) {
        owl.insertBefore(3);
        owl.insertAfter(3);
    } else {
        owl.insertBefore(owl.items.length);
        owl.insertAfter(owl.items.length);
    }

    owl.collectItems();
    owl.allItems[owl.selectItem + owl.beforeDuplicateItem.length].classList.add('active');

    owl.itemInCenter();

    owl.draw();

    owl.setProgressIndicator(document.getElementById('progress-indicator'));
    owl.setNavButtons(document.getElementById('owl-nav-buttons'));

    owl.durationStart(owl.duration);

    owl.navButtons.buttons.addEventListener('click', function(e) { owl.buttonsClick(e); });
    owl.stage.addEventListener('mousedown', function(e) { //drag and drop
        owl.dragAndDropMouseDown(e);
        document.addEventListener('mouseup', mouseUpHandler);
    });
    document.addEventListener('mousemove', function (e) {
        owl.dragAndDropMouseMove(e);
        owl.stopProgressMouseMove(e);
    });
});

function mouseUpHandler(e) {
    owl.dragAndDropMouseUp(e, -1);
    document.removeEventListener('mouseup', mouseUpHandler);
}
