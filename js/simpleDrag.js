'use strict';


(function(){
	// 쉬운 레이아웃을 위한 드래그
	new DragLayout($ts.getEl('[drag]'));

	function DragLayout (obj) {
		var self = this;

		this.dragObj = obj;
        this.keyPressed = {};
	    this.start = function () {
	        function keyPress (e) {
	            self.keyPressed[e.keyCode] = true;
	            self.targetMove();
	        }

	        for (var i in this.dragObj) {
	            this.dragObj[i].style.position = 'absolute';
	            new Drag(this.dragObj[i]);

	            this.dragObj[i].addEventListener('click', function () {
            	    self.target = self.dragObj[i];
            	    document.removeEventListener('keydown', keyPress);
            	    document.addEventListener('keydown', keyPress);
            	    document.addEventListener('keyup', function (e) {
            	        self.keyPressed[e.keyCode] = false;
            	    });
            	});
	        }
	    }

	    this.targetMove = function () {
	        var amount = 1;

	        if (this.keyPressed[16]) { amount = 10; }
	        else if (this.keyPressed[17]) { amount = 100; }

	        if (this.keyPressed[39]) this.target.style.left = parseInt(this.target.style.left) + amount + 'px';
	        else if (this.keyPressed[37]) this.target.style.left = parseInt(this.target.style.left) - amount + 'px';
	        else if (this.keyPressed[40]) this.target.style.top = this.target.offsetTop + amount + 'px';
	        else if (this.keyPressed[38]) this.target.style.top = this.target.offsetTop - amount + 'px';
	    }

	    this.start();
	}

	function Drag (obj) {
		var self = this;

		this.dragObj = obj;
		this.startDrag = function (e) {
			e.stopPropagation();

			var zoomRate = $pm.zoomRate ? $pm.zoomRate : 1,
				startY = (e.type == 'touchmove') ? e.touches[0].clientY : e.clientY,
				startX = (e.type == 'touchmove') ? e.touches[0].clientX : e.clientX,
				startTop = this.dragObj.offsetTop,
				startLeft = this.dragObj.offsetLeft;

			this.dragObj.style.transition = 'none';

			document.addEventListener('mousemove', move);
			document.addEventListener('touchmove', move);
			document.addEventListener('mouseup', end);
			document.addEventListener('touchend', end);

			function move (event) {
				var cientY = (event.type == 'touchmove') ? event.touches[0].clientY : event.clientY,
					cientX = (event.type == 'touchmove') ? event.touches[0].clientX : event.clientX,
					newY = (cientY - startY)/zoomRate + startTop,
					newX = (cientX - startX)/zoomRate + startLeft;

				self.dragObj.style.top = newY + 'px';
				self.dragObj.style.left = newX + 'px';
			}

			function end () {
				document.removeEventListener('mousemove', move);
				document.removeEventListener('touchmove', move);
				document.removeEventListener('mouseup', end);
				document.removeEventListener('touchend', end);
			}
		}

		this.dragObj.addEventListener('mousedown', this.startDrag.bind(this));
		this.dragObj.addEventListener('touchstart', this.startDrag.bind(this));
	}
	
})();