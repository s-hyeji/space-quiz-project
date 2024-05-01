/* ─────────────────────┐
	data: 2018.09.04
	name: Drag.js
└───────────────────── */
"use strict";

(function () {
  function getZoomRate(target) {
    var newTarget = target.offsetWidth !== 0 ? target : target.parentElement;
    var width = newTarget.offsetWidth;
    var currentWidth = newTarget.getBoundingClientRect().width;
    return currentWidth / width;
  }

  function Drag(opts) {
    var self = this;

    var type = opts.type ? opts.type : "all",
      dragObj = opts.dragObj,
      container = opts.container ? opts.container : document.body;

    if (opts.callback) {
      var move_callBack = opts.callback.move || null,
        end_callBack = opts.callback.end || null;
    }

    var startY, startX, startTop, startLeft, zoomRate;

    this.dragObj = dragObj;

    function move(event) {
      var clientY =
          event.type == "touchmove" ? event.touches[0].clientY : event.clientY,
        clientX =
          event.type == "touchmove" ? event.touches[0].clientX : event.clientX,
        newY = Math.round((clientY - startY) / zoomRate + startTop),
        newX = Math.round((clientX - startX) / zoomRate + startLeft);

      self.newY = newY;
      self.newX = newX;

      if (type !== "horizon") dragObj.style.top = newY + "px";
      if (type !== "vertical") dragObj.style.left = newX + "px";

      if (move_callBack) move_callBack(self, event);
    }

    function end(event) {
      container.removeEventListener("mousemove", move);
      container.removeEventListener("touchmove", move);
      document.removeEventListener("mouseup", end);
      document.removeEventListener("touchend", end);

      if (end_callBack) end_callBack(self, event);
    }

    this.startDrag = function (e) {
      e.stopPropagation();

      zoomRate = getZoomRate(dragObj);
      startY = e.type == "touchstart" ? e.touches[0].clientY : e.clientY;
      startX = e.type == "touchstart" ? e.touches[0].clientX : e.clientX;
      startTop = dragObj.offsetTop;
      startLeft = dragObj.offsetLeft;

      dragObj.style.transition = "none";

      container.addEventListener("mousemove", move);
      container.addEventListener("touchmove", move);
      document.addEventListener("mouseup", end);
      document.addEventListener("touchend", end);
    };
console.log(dragObj)
    dragObj.addEventListener("mousedown", this.startDrag.bind(this));
    dragObj.addEventListener("touchstart", this.startDrag.bind(this));

    container.addEventListener("touchstart", function (e) {
      // e.preventDefault();
      e.stopPropagation();
    });
    document.addEventListener("pointerup", function (e) {
      // e.preventDefault();
      e.stopPropagation();
    });
  }

  window.$Drag = Drag;
})();

if (document.querySelectorAll("[data-drag]")) {
  var dragObjs = document.querySelectorAll("[data-drag]");
  dragObjs.forEach(function (dragObj) {
    new $Drag({
      dragObj: dragObj,
    });
  });
}