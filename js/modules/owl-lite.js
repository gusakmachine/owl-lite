/* Author: utorrentfilibusters@gmail.com */
class Owl {
    constructor(owl, items) {
        this.stage = owl;
        this.items = items;
        this.allItems = [];

        for (let i = 0; i < this.items.length; i++)
            this.allItems.push(this.items[i]);

        this.itemWidth = this.items[0].offsetWidth + parseInt(getComputedStyle(this.items[0]).marginRight) + parseInt(getComputedStyle(this.items[0]).marginLeft);
        this.bias = 0;
        this.staticDirection = this.direction = 1;

        this.selectItem = 0;

        this.duplicateItems = [];
        this.beforeDuplicateItem = [];
        this.afterDuplicateItem = [];

        this.addToMaxPrevItem = 0;
        this.addToMaxNextItem = 0;

        this.timeoutID = 0;

        this.transitionDuration = 250;
        this.duration = 500;

        this.stage.style = 'transition: all ' + this.transitionDuration + 'ms ease-in-out';

        this.top = this.stage.getBoundingClientRect().top;
        this.bottom = this.stage.getBoundingClientRect().bottom;

        this.stopTimeoutTime = 0;
        this.startProgressTime = 0;

        this.transitionEndHandler = this.transitionend.bind(this);
        this.transitionStartHandler = this.transitionstart.bind(this);
        this.durationEndHandler = this.durationEnd.bind(this);

        this.stage.addEventListener('transitionend', this.transitionEndHandler);
        this.stage.addEventListener('transitionstart', this.transitionStartHandler);

        this.navButtons = {
            buttons: false,
            prev: false,
            next: false
        };
        this.progressIndicator = {
            indicator: false,
            transition: false,
            width: false
        };

        this.stage.classList.add('no-transition');
    }
    setNavButtons(buttons) {
        this.navButtons = {
            buttons: buttons,
            prev: buttons.children[0],
            next: buttons.children[1]
        }
    }
    setProgressIndicator(indicator) {
        this.progressIndicator = {
            indicator: indicator,
            transition: 'width ' + this.duration + 'ms linear',
            width: (this.itemWidth - parseInt(getComputedStyle(this.items[0]).marginRight) - parseInt(getComputedStyle(this.items[0]).marginLeft)) / 100 * 90
        };
        this.startProgressTime = Date.now();
        this.startProgress();
    }

    prevItem(addToMaxPrevItem = 0) {
        if (this.selectItem > 0 - addToMaxPrevItem)
            this.selectItem--;
        else this.selectItem = this.items.length - 1;
    }
    nextItem(addToMaxNextItem = 0) {
        if (this.selectItem < this.items.length - 1 + addToMaxNextItem)
            this.selectItem++;
        else this.selectItem = 0;
    }

    draw(selectItem = this.selectItem) {
        this.stage.style.transform = 'translate3d(' + ((selectItem * this.itemWidth * -1) + this.bias) + 'px, 0, 0)';
    }

    itemInCenter() {
        //calculates the difference between the center of the screen and the center of the current
        //owl.item and sets the appropriate this.bias
        if (this.direction > 0) this.bias = (
            (-1 * this.selectItem * this.itemWidth)
            //subtract the current translate3d because
            //getBoundingClientRect().left does not take into account the current translate3d
            + window.innerWidth/2 - this.items[this.selectItem].getBoundingClientRect().left
            - this.items[this.selectItem].offsetWidth/2
        );
        else this.bias = (
            (this.selectItem * this.itemWidth)
            + window.innerWidth/2 - this.items[this.selectItem].getBoundingClientRect().left
            - this.items[this.selectItem].offsetWidth/2
        );
    }
    collectItems() {
        this.allItems = [];
        for (let i = this.beforeDuplicateItem.length - 1; i > -1; i--)
            this.allItems.push(this.beforeDuplicateItem[i]);

        for (let i = 0; i < this.items.length; i++)
            this.allItems.push(this.items[i]);

        this.afterDuplicateItem.forEach((value, index) => {
            this.allItems.push(value);
        });
    }

    insertBefore(numberItems) {
        for (let i = 0, j = this.items.length - 1; i < numberItems; i++, j--) {
            this.beforeDuplicateItem[i] = this.items[j].cloneNode(true);
            this.beforeDuplicateItem[i].className = this.beforeDuplicateItem[i].className + '--duplicate';
            this.stage.prepend(this.beforeDuplicateItem[i]);
        }
    }
    insertAfter(numberItems) {
        for (let i = 0; i < numberItems; i++) {
            this.afterDuplicateItem[i] = this.items[i].cloneNode(true);
            this.afterDuplicateItem[i].className = this.afterDuplicateItem[i].className + '--duplicate';
            this.stage.append(this.afterDuplicateItem[i]);
        }
    }

    startProgress(transition = this.progressIndicator.transition, width = this.progressIndicator.width) {
        if (this.progressIndicator.indicator) {
            this.progressIndicator.indicator.style.transition = transition;
            this.progressIndicator.indicator.style.width = width + 'px';
        }
    }
    clearProgress() {
        if (this.progressIndicator.indicator) {
            this.progressIndicator.indicator.style.transition = '';
            this.progressIndicator.indicator.style.width = '0px';
        }
    }

    dragAndDropMouseDown(e) {
        this.mousedown = true;

        clearTimeout(this.timeoutID);
        this.clearProgress();
        this.timeoutID = -2;
        this.startProgressTime = this.stopTimeoutTime = 0;

        this.oldMousePos = e.pageX;
        this.currStagePos = (this.selectItem * this.itemWidth * -1) + this.bias;

        this.stage.classList.remove('no-transition');
        this.allItems.forEach(element => element.classList.remove('active'));
        this.stage.style.transition = 'transform 0s';
    }
    dragAndDropMouseUp(e, timeoutID = 0) {
        this.mousedown = false;

        this.stage.style = 'transition: all ' + this.transitionDuration + 'ms ease-in-out';

        if (e.pageX - this.oldMousePos > 5)
            this.selectItem = Math.floor((this.currStagePos - this.bias  + (e.pageX - this.oldMousePos)) / this.itemWidth * -1);
        else if (e.pageX - this.oldMousePos < 5)
            this.selectItem = Math.ceil((this.currStagePos - this.bias  + (e.pageX - this.oldMousePos)) / this.itemWidth * -1);

        this.draw();

        this.allItems[this.selectItem + this.beforeDuplicateItem.length].classList.add('active');

        this.timeoutID = timeoutID;
    }
    dragAndDropIfMaxStagePos(e) {
        if (Math.floor((this.currStagePos - this.bias + (e.pageX - this.oldMousePos)) / this.itemWidth * -1) == this.items.length - 1 + this.addToMaxNextItem)
            this.currStagePos += this.items.length * this.itemWidth;
        else if (Math.ceil((this.currStagePos - this.bias + (e.pageX - this.oldMousePos)) / this.itemWidth * -1) == -this.addToMaxPrevItem)
            this.currStagePos -= this.items.length * this.itemWidth;
    }
    dragAndDropDraw(e) {
        this.stage.style.transform = 'translate3d(' + (this.currStagePos + (e.pageX - this.oldMousePos)) + 'px, 0, 0)';
    }
    dragAndDropMouseMove(e) {
        if (this.mousedown) {
            this.stage.ownerDocument.defaultView.getSelection().removeAllRanges(); //remove text selection

            this.dragAndDropIfMaxStagePos(e);
            this.dragAndDropDraw(e);
        }
    }

    getRemainingWidth() {
        let remainingProgressIndicatorWidth = (this.progressIndicator.width/100) * ((this.stopTimeoutTime - this.startProgressTime)/(this.duration/100));
        if (remainingProgressIndicatorWidth > this.progressIndicator.width || remainingProgressIndicatorWidth < 0)
            return 0;
        return remainingProgressIndicatorWidth;
    }
    getRemainingDuration() {
        let remainingDuration = (this.duration - (this.stopTimeoutTime - this.startProgressTime));
        if (remainingDuration > this.duration || remainingDuration < 0) {
            this.stopTimeoutTime = this.startProgressTime = 0;
            return this.duration;
        }
        return remainingDuration;
    }
    refreshStartTime() {
        let newStartTime = Date.now() - (this.stopTimeoutTime - this.startProgressTime);
        return newStartTime;
    }

    buttonsClick(e) {
        if (this.navButtons.buttons == e.target.parentElement && !this.transitionStartTime) {
            clearTimeout(this.timeoutID);
            this.clearProgress();
            this.startProgressTime = this.stopTimeoutTime = 0;

            this.stage.classList.remove('no-transition');
            this.allItems[this.selectItem + this.beforeDuplicateItem.length].classList.remove('active');

            if (e.target == this.navButtons.prev) {
                this.prevItem(this.addToMaxPrevItem);
                this.direction = 1; //needed because condition in transitionstart() will not work
            } else if (e.target == this.navButtons.next) {
                this.nextItem(this.addToMaxNextItem);
                this.direction = -1;
            }

            this.draw();

            this.timeoutID = -1; //blocks a new cycle that starts in transitionend()
        }
    }

    stopProgressMouseMove(e) {
        if (!this.transitionStartTime && !this.mousedown)
            if (e.pageY > this.top && e.pageY < this.bottom && this.timeoutID > -1) {
                clearTimeout(this.timeoutID);
                this.timeoutID = -1;
                this.clearProgress();
                this.stopTimeoutTime = Date.now();

                this.progressIndicator.indicator.style.width = this.getRemainingWidth() + 'px';
            } else if (this.timeoutID == -1 && !(e.pageY > this.top && e.pageY < this.bottom)) {
                this.startProgress('width ' + this.getRemainingDuration() + 'ms linear');

                this.timeoutID = setTimeout(this.durationEnd.bind(this), this.getRemainingDuration());

                this.startProgressTime = this.refreshStartTime();
                //needed because user mouse can stay
                //on scene unlimited time, but when him again enter the scene on this owl-item
                //this.stopTimeoutTime may turn out to be more than this.startProgressTime
            }
    }

    durationStart(duration = this.duration) {
        this.startProgress();
        this.startProgressTime = Date.now();
        this.timeoutID = setTimeout(this.durationEndHandler, duration);
    }
    durationEnd() {
        this.allItems[this.selectItem + this.beforeDuplicateItem.length].classList.remove('active');
        this.timeoutID = 0;
        this.stage.classList.remove('no-transition');

        if (this.direction > 0)
            this.prevItem(this.addToMaxPrevItem);
        else this.nextItem(this.addToMaxNextItem);

        this.draw();
    }
    transitionstart(e) {
        if (e.target == this.stage) {
            this.transitionStartTime = Date.now();
            this.clearProgress();

            //if this.selectItem == last-select-item
            if (this.direction < 0 && this.addToMaxPrevItem != 0 && this.selectItem == this.items.length - 1 + this.addToMaxNextItem)
                this.nextItem(this.addToMaxNextItem);
            else if (this.addToMaxNextItem != 0 && this.selectItem == -this.addToMaxPrevItem)
                this.prevItem(this.addToMaxPrevItem);

            this.direction = this.staticDirection;
        }
    }
    transitionend(e) {
        if (e.target == this.stage) {
            this.stage.classList.add('no-transition');
            this.draw();

            if (this.timeoutID == 0)
                this.durationStart();

            this.allItems[this.selectItem + this.beforeDuplicateItem.length].classList.add('active');

            this.transitionStartTime = false;
        }
    }
}