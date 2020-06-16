
/* Author: utorrentfilibusters@gmail.com */

-Add to CSS: 
	.owl-wrapper {
		display: flex;
        justify-content: center;
		width: 100%;
        overflow: hidden;
	}
	.progress-indicator { width: 0px; }
	.owl-stage {
		position: absolute;
		display: inline-flex;
	 }
	.no-transition { transition: none !important; }
	 
-Add to HTML
 //not less than two .owl-items 
 //adds .owl-item class last
	Example:
	<div class="owl-center-alignment">
		<div class="owl-stage">
			<div class="owl-item"></div>
			<div class="owl-item"></div>
			<div class="owl-item"></div>
		</div>
	</div>
	
-Add to JS:
 //you can change name of HTML-classes
	owl = new Owl(
        document.getElementById('owl-stage'),
        document.getElementsByClassName('owl-item'),
    );
	
    owl.allItems[owl.selectItem + owl.beforeDuplicateItem.length].classList.add('active');
	
	owl.durationStart(owl.duration);
	
Optional prepare before: owl.durationStart();
 //standard class value ​​are shown here, values != values of prepareScene();

	Direction:
		owl.staticDirection = owl.direction = 1;
		//(1) --> left to right
		//(-1) --> right to left
		
	Transition duration:
		owl.transitionDuration = 250; (ms)
		//if you change owl.transitionDuration, paste after:
		//owl.stage.style = 'transition: all ' + owl.transitionDuration + 'ms ease-in-out';
		
	Duration:
		owl.duration = 500; (ms)
		//not less than owl.transitionDuration
		
	Initial item:
		owl.select = 0;
		//not more than owl.items.lenght - 1
		
	Seamless transition:
	//copy and paste all
		//to activate change the values ​​to 1 or not more than all owl.allItems.lenght - 1
		addToMaxNextItem = addToMaxPrevItem = 0;
		
		//need to fill all entire screen with .owl-items
		if (owl.items.length > 2) {
			owl.insertBefore(3);
			owl.insertAfter(3);
		} else {
			owl.insertBefore(owl.items.length);
			owl.insertAfter(owl.items.length);
		}
		
		//update items-number
		owl.collectItems();
		
		//paint
		owl.draw();
		
	Items in center:
		CSS:
			.some-owl-center-alignment-parent {
				display: flex;
				justify-content: center;
				width: 100%;
				overflow: hidden;
			}
		HTML: 
			<div class="ome-owl-center-alignment-parent">
				<div class="owl-center-alignment">
					<div class="owl-stage">
						...
					</div>
				</div>
			</div>
		JS:		
			owl.itemInCenter();
			//call only after all the manipulation of the number of owl-items
			//won't work if you call them in resize-events
			owl.draw();
		
	Progress bar:
		CSS:
			.progress-indicator { width: 0px; }
		HTML:
			<div id="progress-indicator"></div>
		JS:
			//you can sets default values: 
			owl.setProgressIndicator(document.getElementById('progress-indicator'));
			//or cusomize
			owl.progressIndicator.indicator = document.getElementById('progress-indicator'); 	
			owl.progressIndicator.width, sets max width, setProgressIndicator default - 90% of owl-item width, integer or float
			owl.progressIndicator.transition, default - 'width ' + owl.duration + 'ms linear'
	
	Left-right buttons:
		HTML:
			<div id="owl-nav-buttons">
				<div class="owl-nav-buttons"></div>
				<div class="owl-nav-buttons"></div>
			</div>
		JS:
			//...
			owl.setNavButtons(document.getElementById('owl-nav-buttons'));
			//...
			owl.navButtons.buttons.addEventListener('click', function(e) { owl.buttonsClick(e); });
			//...
			
	Stop-progress:
		document.addEventListener('mousemove', function (e) {
			//...
			owl.stopProgressMouseMove(e);
			//...
		});
		
	Drag and drop:
		function mouseUpHandler(e) {
			owl.dragAndDropMouseUp(e, -1);
			// (-1) --> if you use stop-progress
			// (0) --> if you not use stop-progress
			document.removeEventListener('mouseup', mouseUpHandler);
		}
		owl.stage.addEventListener('mousedown', function(e) { 
			owl.dragAndDropMouseDown(e);
			document.addEventListener('mouseup', mouseUpHandler);
		});
		document.addEventListener('mousemove', function (e) {
			//...
			owl.dragAndDropMouseMove(e);
			//...
		});
	
//Below is a lot of pseudo code, do not use code inserts
Base logic of module:
 All CSS-transitions works using translate3d(owl.selectItem * owl.itemWidth) in draw(),
 later incrementing or decrementing owl.selectItem

 It all starts with the launch of durationStart() which, at the end setTimeout(durationEnd(), owl.duration), starts the durationEnd().
 durationEnd() choose next item and calling draw() which starts CSS-transition.

 In the time of CSS-transition triggered browser event 'transitionstart' wich we catch use addEventListener,
 he cheks owl.selectItem and if it is equal to the maximum or minimum value,
 changes him on 0 or owl.items.lenght - 1

 Also we cath 'transitionend', here we clean CSS-transition and draw the current position,
 if in 'transitionstart' owl.selectItem == maximum or minimum value,
 function instantly transfers the scene to the other end to duplicate this item 
 (if you include use Seamless transition), and starts a new cycle by starting durationStart()

Functions:
	/*
	* e -> browser event
	* next-item = owl.selectItem++ |OR| owl.select-item-- (depends on owl.direction)
	* max-next-item = owl.items.lenght + owl.addMaxNext
	* max-prev-item = 0 - owl.addMaxPrev
	* last-select-item = owl.items.lenght - owl.addMaxPrev /OR/ owl.items.lenght + owl.addMaxNext (depends on owl.direction)
	*
	* cycle - one full transition (owl.transitionDuration), with delay (owl.duration) on current owl-item
	* animation - CSS transition, the default is an animation of 250ms translate3d on the X-axis 
	*/
	
    setNavButtons(buttons) //filling owl.progress-indicator with values, buttons -> only HTML-ojbect
    setProgressIndicator(indicator) //filling owl.navButtons with values, indicator -> only HTML-ojbect

    prevItem(addToMaxPrevItem = 0) //sets next items, if next == max-next-item + addMaxNext assign value 0
    nextItem(addToMaxNextItem = 0) //sets previously items, if prev == 0 - addMaxPrev, assign value owl.items.length - 1

    draw(selectItem) //calculates based on owl.selectItem position and apply translate3d, selectItem -> only integer

    itemInCenter() //sets owl.selectItem in center, use only before launch
    collectItems() //counts all items, and writes them to owl.allItems

    insertBefore(numberItems) //takes the last items and adds to the beginning, numberItems -> only integer
    insertAfter(numberItems) //takes the first items and adds to the end, numberItems -> only integer

    startProgress(transition, width)
	/*
	* sets transition on .progress-indicator
	* transition -> only string, default value = 'width ' + this.duration + 'ms linear' (sets in setProgressIndicator())
	* width -> only integer or float, default value = 90% of the owl-item (sets in setProgressIndicator())
	*/
    clearProgress() //removes the transition from the stage

    dragAndDropMouseDown(e) //activate drag and drop
    dragAndDropMouseUp(e, timeoutID = 0) //deactivate drag and drop, timeoutID -> only integer
    dragAndDropIfMaxStagePos(e) 
	/*
	* when X-mouse-position < 0 or X-mouse-position > owl.items.lenght * owl.itemWidth
	* will update the position and when calling owl.dragAndDrop Draw () will transfer the scene to the other end
	*/
    dragAndDropDraw(e) //calculates based on mouse position and apply translate3d
    dragAndDropMouseMove(e) //removes all text selection and call dragAndDropIfMaxStagePos(e) & dragAndDropDraw(e)

	getRemainingWidth() //return only integer or float remaining width of progress-indicator
    getRemainingDuration() //return only integer remaining width of progress-indicator (milliseconds)
    refreshStartTime() 
	/*
	* starts when called
	* return new start time, only integer (milliseconds)
	*/

    buttonsClick(e) 
	/*
	* starts when called, will not start up if user clicked not on one of two owl.navButtons and also if translate3d-animation happening now
	* deletes the animation of progress-indicator, resets time, blocks the new cycle,
	* deletes HTML-class .no-transition from the stage 
	* then depending on which button the user clicked
	* will select the next or previous element and change owl.direction accordingly
	* and starts the animation (owl.draw())
	*/
	
    stopProgressMouseMove(e) 
	/*
	* fires when the mouse enters the Y-position of the scene and if drag and drop or translate3d-animation is not working
	* if the mouse is within the scene, will stop the cycle,
	* deletes the animation of progress-indicator, record the time the cycle stops in owl.stopTimeoutTime,
	* and set the width, where it stopped
	* when user mouse leave the scene 
	* calculates the remaining time and starts the loop and animation progress-indicator
	*/
	
    durationStart(duration => only integer) 
	/*
	* starts when called
	* sets owl.startProgressTime = Date.now() and begins progress-indicator animation
	* begins new cycle when ends setTimeout()
	*/
	
    durationEnd()
	/*
	* starts when called
	* updates .owl-item HTML-class, removes past .active
	* sets owl.timeoutID = 0, for start up next cycle if owl.timeoutID has been changed
	* select next-item, removes the .no-transition HTML class from the owl-stage, and translate owl-stage on new position
	*/
	
	transitionstart() 
	/*
	* starts up when beginning transition
	* sets transitionStart = Date.now() and progress-indicator width = 0
	* changes owl.selectItem to the next if owl.selectItem == last-select-item 
	* updates current .owl-item HTML-class, adding .active
	* because in buttonsClick(e) owl.direction changing: owl.direction = owl.staticDirection;
	* sets owl.transitionStartTime = Date.now(), is used to ban work, because buttonsClick(e) and stopProgressMouseMove(e) can to work during translate3d-animation 
	*/
	
    transitionend() 
	/*
	* starts up when ends transition
	* sets on stage .no-transition HTML-class for seamless transition 
	* and when transitionstart() will change owl.selectItem on last or first item,
	* stage translate3d will instantly change without transition
	* start up durationStart() if owl.timeoutID == 0, condition necessary if need to stop the cycle
	* sets owl.transitionStartTime = false
	*/
	
	
	