(() => {
  function getEl(target, parent) {
    const array = [];
    const container = parent ? parent : document;
    const el = container.querySelectorAll(target);

    for (let i = 0; i < el.length; i++) array.push(el[i]);

    return array;
  }
  function getAttr(target, type) {
    let attr = target.getAttribute(type);
    if (attr.indexOf(",") > -1) attr = attr.replace(" ", "").split(",");
    return attr instanceof Array ? attr : [attr];
  }
  function getZoomRate(target) {
    const width = target.offsetWidth;
    const currentWidth = target.getBoundingClientRect().width;
    return currentWidth / width;
  }
  function getEventData(event) {
    const IsTouched = event.type.indexOf("touch") > -1;
    const newEvent = IsTouched ? event.changedTouches[0] : event;

    return {
      x: newEvent.clientX,
      y: newEvent.clientY,
    };
  }
  function getTarget(event) {
    return document.elementFromPoint(
      getEventData(event).x,
      getEventData(event).y
    );
  }
  function getPointer(newData, centerPointer = { x: 0, y: 0 }) {
    return {
      x: newData.x + centerPointer.x,
      y: newData.y + centerPointer.y,
    };
  }
  function getLine(pointerA, pointerB) {
    const result = {};

    if (pointerA.x >= pointerB.x) result.x = pointerA.x - pointerB.x;
    else result.x = pointerB.x - pointerA.x;

    if (pointerA.y >= pointerB.y) result.y = pointerA.y - pointerB.y;
    else result.y = pointerB.y - pointerA.y;

    return (
      Math.round(result.x) * Math.round(result.x) +
      Math.round(result.y) * Math.round(result.y)
    );
  }

  const CLASS_DRAGOBJ = ".js-dragObj";
  const CLASS_DRAWAREA = ".js-drawArea";
  const ATTR_TYPE = "data-type";
  const ATTR_INDEX = "data-index";
  const ATTR_OPTION = "data-option";

  const CLASS_ISDRAGGING = "isDragging";
  const CLASS_COMPLETE = "complete";
  const CLASS_ON = "on";

  class DRAGOBJ {
    constructor(obj) {
      this.dom = obj;
      this.style = this.getStyle(obj);
      this.type = getAttr(this.dom, ATTR_TYPE);
      this.index = getAttr(this.dom, ATTR_INDEX);

      // bind
      this.move = this.move.bind(this);
      this.resetPosition = this.resetPosition.bind(this);
      this.on = this.on.bind(this);
      this.normalize = this.normalize.bind(this);
      this.complete = this.complete.bind(this);
      this.offPointer = this.offPointer.bind(this);
      this.onPointer = this.onPointer.bind(this);
    }

    getStyle(obj) {
      return {
        width: obj.offsetWidth,
        height: obj.offsetHeight,
        x: obj.offsetLeft,
        y: obj.offsetTop,
        centerX: obj.offsetWidth / 2,
        centerY: obj.offsetHeight / 2,
      };
    }

    setPosition() {
      this.style.x = this.dom.offsetLeft;
      this.style.y = this.dom.offsetTop;
    }

    move({ x, y }) {
      this.dom.style.left = x + "px";
      this.dom.style.top = y + "px";
    }

    resetPosition() {
      this.dom.style.top = "";
      this.dom.style.left = "";
      this.style = this.getStyle(this.dom);
    }

    on() {
      this.dom.classList.remove(CLASS_COMPLETE);
      this.dom.classList.add(CLASS_ON);
      this.dom.style.pointerEvents = "none";
    }

    complete() {
      this.isComplete = true;
      this.dom.classList.remove(CLASS_ON);
      this.dom.classList.add(CLASS_COMPLETE);
    }

    normalize() {
      this.isComplete = false;
      this.dom.classList.remove(CLASS_COMPLETE);
      this.dom.classList.remove(CLASS_ON);
      this.dom.style.pointerEvents = "";
    }

    offPointer() {
      this.dom.style.pointerEvents = "none";
    }

    onPointer() {
      this.dom.style.pointerEvents = "";
    }
  }

  class DRAGDROP {
    constructor({ container, objs, options, callback }) {
      this.container = container;
      this.objs = this.setDragObjs(objs);
      this.options = options;
      this.callback = callback;

      this.isComplete = false;

      // bind
      this.start = this.start.bind(this);
      this.move = this.move.bind(this);
      this.end = this.end.bind(this);
      this.out = this.out.bind(this);
      this.correct = this.correct.bind(this);
      this.incorrect = this.incorrect.bind(this);

      this.container.addEventListener("mousedown", this.start);
      this.container.addEventListener("touchstart", this.start);
      this.container.addEventListener("pointerup", function (e) {
        e.stopPropagation();
      });
      // this.container.addEventListener('touchstart', function(e){
      //   e.stopPropagation();
      // });

      if (this.options.lock) this.lockOn();
    }

    get zoomRate() {
      return getZoomRate(this.container);
    }

    get isSameType() {
      console.log("type@@@@@@@@@@@@@@@@@@",this.currentObj)
      return (
        this.currentObj.type.filter((typeA) => {
          return (
            this.startObj.type.filter((typeB) => typeA == typeB).length > 0
          );
        }).length > 0
      );
    }

    get isSameIndex() {
      return (
        this.currentObj.index.filter((indexA) => {
          return (
            this.startObj.index.filter((indexB) => indexA == indexB).length > 0
          );
        }).length > 0
      );
    }

    get isCorrect() {
      if (this.options.free) return true;
      else if (this.currentObj) {
        // if (this.options.noanswer && this.isSameType) return false;
        // else if (this.options.answer && this.isSameType && !this.isSameIndex)
        //   return false;
        // else return true;
        return true;
      }

      return false;
    }

    lockOn() {
      this.objs.forEach((obj) => {
        if (obj.type == "drop") obj.offPointer();
      });
    }

    lockOff() {
      this.objs.forEach((obj) => {
        if (obj.type == "drop") obj.onPointer();
      });
    }

    setDragObjs(objs) {
      return objs.map((obj) => {
        const dragObj = new DRAGOBJ(obj);
        return dragObj;
      });
    }

    getCurrentObj(target) {
      const result = this.objs.filter((drag) => drag.dom == target);
      return result.length > 0 ? result[0] : false;
    }

    getIsEnter(target) {
      const isObj = this.getCurrentObj(target);
      const isContainer = target == this.container;

      return isObj || isContainer;
    }

    getIsCallback(name) {
      return this.callback && this.callback[name];
    }

    getSameTypeObjs() {
      return this.objs.filter((obj) => obj.type[0] === this.startObj.type[0]);
    }

    addEvent() {
      this.container.addEventListener("mousemove", this.move);
      this.container.addEventListener("touchmove", this.move);
      this.container.addEventListener("mouseup", this.end);
      this.container.addEventListener("touchend", this.end);
      this.container.addEventListener("mouseout", this.out);
    }

    removeEvent() {
      this.container.removeEventListener("mousemove", this.move);
      this.container.removeEventListener("touchmove", this.move);
      this.container.removeEventListener("mouseup", this.end);
      this.container.removeEventListener("touchend", this.end);
      this.container.removeEventListener("mouseout", this.out);

      if (this.startObj) this.startObj.normalize();
      if (this.options.lock) this.lockOn();
    }

    cloneObj(target) {
      const clone = target.cloneNode(true);
      this.container.appendChild(clone);

      return new DRAGOBJ(clone);
    }

    pointerOffSameTypeObjs() {
      this.sameTypeObjs.forEach((obj) => obj.offPointer());
    }

    pointerOnSameTypeObjs() {
      this.sameTypeObjs.forEach((obj) => obj.onPointer());
    }

    start(event) {
      event.preventDefault();
      event.stopPropagation();

      this.startData = getEventData(event);
      this.startObj = this.getCurrentObj(getTarget(event));

      if (!this.startObj || this.startObj == this.container) return;
      else {
        console.log("start drag!!!!");
        this.container.classList.add(CLASS_ISDRAGGING);
        this.sameTypeObjs = this.getSameTypeObjs();

        if (this.options.copy && !this.startObj.isClone) {
          this.startObj = this.cloneObj(getTarget(event));
          this.startObj.isClone = true;
          if (this.options.answer || this.options.noanswer)
            this.pointerOffSameTypeObjs();
        }

        this.startObj.setPosition();
        this.startObj.on();
        this.addEvent();

        this.getIsCallback("start") && this.callback.start(this);
      }
    }

    move(event) {
      event.preventDefault();
      event.stopPropagation();

      this.moveData = getEventData(event);

      const newData = {
        x:
          (this.moveData.x - this.startData.x) / this.zoomRate +
          this.startObj.style.x,
        y:
          (this.moveData.y - this.startData.y) / this.zoomRate +
          this.startObj.style.y,
      };

      this.startObj.move(newData);
      if (this.options.lock) this.lockOff();

      this.getIsCallback("move") && this.callback.move(this, newData);

      if (!this.getIsEnter(getTarget(event))) this.out();
    }

    end(event) {
      this.container.classList.remove(CLASS_ISDRAGGING);

      this.currentObj = this.getCurrentObj(getTarget(event));
      this.pointerOnSameTypeObjs();
      this.removeEvent();

      this.getIsCallback("end") && this.callback.end(this);

      if (this.isCorrect) this.correct();
      else this.incorrect();
    }

    out(event = false) {
      if (event && this.getIsEnter(getTarget(event))) return;
      else {
        this.removeEvent();
        this.resetObj(this.startObj);
        this.replay();
        this.getIsCallback("out") && this.callback.out(this);
      }
    }

    correct() {
      this.startObj.complete();
      this.currentObj && this.currentObj.complete();
      if (this.options.copy && !this.startObj.isPushed) {
        this.objs.push(this.startObj);
        this.startObj.isPushed = true;
      }
      this.getIsCallback("correct") && this.callback.correct(this);
    }

    incorrect() {
      this.resetObj(this.startObj);
      this.replay();
      this.getIsCallback("incorrect") && this.callback.incorrect(this);
    }

    resetObj(obj) {
      obj.normalize();
      obj.resetPosition();

      if (obj.isClone && this.isChild(obj.dom))
        this.container.removeChild(obj.dom);
    }

    isChild(node) {
      return this.container.contains(node);
    }

    replay() {
      if (this.options.lock) this.lockOn();

      this.startObj = undefined;
      this.currentObj = undefined;
    }

    reset() {
      this.removeEvent();
      this.objs = this.objs.filter((obj) => {
        this.resetObj(obj);
        if (!obj.isClone) return obj;
      });
      this.replay();
    }
  }

  /**
   * 선그리기
   */
  class DrawLine {
    /**
     * 생성자
     * @param {*} opts 옵션 {
     * container : 선그리기 dom
     * answer : 정답 선 좌표 (ex) {
        start: {x: 12, y: 75},
        end: {x: 56, y: 75},
        lineDash: [16, 16]
       }
     * style : { // 선 스타일
     *  lineColor: 선 색상,
        lineWidth: 선 두께,
        lineCap: 선 끝 부분,
        lineJoin: 선 꺽이는 부분
        lineDash: 점선 간격 (ex) [5, 5]
        }
       answerButton : 정답 버튼 dom
       resetButton : 다시하기 버튼 dom
     * }
     */
    constructor(opts) {
      this.OPTS = opts;
      this.container = opts.container;
      this.answer = opts.answer;
      this.style = this.setStyle(opts);
      this.drawArea = this.setDrawArea();
      this.resetButton = opts.resetButton;
      this.answerButton = opts.answerButton;
      this.answerResetButton = opts.answerResetButton;
      this.options = this.setOptions(getAttr(this.container, ATTR_OPTION));
      this.callback = opts.callback;
      this.delay = opts.delay

      this.savedLines = [];
      this.isDrawingMode = this.options.drawing || false;
      this.sideLines = [];
      this.isComplete = false;
      this.testQuiz = opts.testQuiz;
      this.customAnswer = opts.customAnswer;
      // bind
      this.binding();

      this.DRAGDROP = new DRAGDROP({
        container: this.container,
        objs: getEl(CLASS_DRAGOBJ, this.container),
        zoomRate: this.zoomRate,
        options: this.options,
        callback: {
          start: this.start,
          move: this.move,
          end: this.end,
          out: this.out,
          correct: this.correct,
          incorrect: this.incorrect,
        },
      });

      // this.resetButton.addEventListener('touchstart', this.reset);

      if (this.resetButton) {
        this.resetButton.classList.add("displayN");
        this.resetButton.addEventListener("click", this.reset);
        if ($efSound && $efSound.click)
          this.resetButton.addEventListener("click", $efSound.click);
        this.resetButton.addEventListener("touchstart", (e) => {
          e.stopPropagation();
        });
      }

      if (this.answerButton) {
        this.answerButton.addEventListener("click", this.toggleAnswer);
        if ($efSound && $efSound.click)
          this.answerButton.addEventListener("click", $efSound.click);
      }
    }

    get zoomRate() {
      return getZoomRate(this.container);
    }

    binding() {
      this.start = this.start.bind(this);
      this.move = this.move.bind(this);
      this.end = this.end.bind(this);
      this.out = this.out.bind(this);
      this.correct = this.correct.bind(this);
      this.incorrect = this.incorrect.bind(this);
      this.reset = this.reset.bind(this);
      this.showAnswer = this.showAnswer.bind(this);
      this.toggleAnswer = this.toggleAnswer.bind(this);
      console.log("start", this.start)
      console.log("move", this.move.bind(this))
      console.log("end", this.end.bind(this))
      console.log("out", this.out.bind(this))
      console.log("correct", this.correct.bind(this))
      console.log("incorrect", this.incorrect.bind(this))
      console.log("reset", this.reset.bind(this))
      console.log("showanswer", this.showAnswer.bind(this))
      console.log("toggleAnser", this.toggleAnswer.bind(this))
    }

    toggleAnswer() {
      if (this.isComplete) this.reset("answerButton");
      else this.showAnswer();
    }

    changeAnswerButtonState(type) {
      this.answerButton.setAttribute("data-type", type);
    }

    // setDrawArea() {
    //   const area = this.container.querySelector(CLASS_DRAWAREA);
    //   area.width = this.container.offsetWidth;
    //   area.height = this.container.offsetHeight;
    //   if (this.container.classList.contains('drawLine-cus')) {
    //     area.width= 832;
    //     area.height= 540;
    //   }
    //   this.context = area.getContext("2d");

    //   if (this.context) {
    //     this.context.strokeStyle = this.style.lineColor;
    //     this.context.lineWidth = this.style.lineWidth;
    //     this.context.lineCap = this.style.lineCap;
    //     this.context.lineJoin = this.style.lineJoin;
    //     this.context.save();
    //   }
    //   return area;
    // }

    setDrawArea() {
      const area = this.container.querySelectorAll(CLASS_DRAWAREA);
      console.log("test")
      console.log(area)
      console.log(area[0])
      for (let i = 0; i < area.length; i++) {
        area[i].width = this.container.offsetWidth;
        area[i].height = this.container.offsetHeight;

        if (this.container.classList.contains('drawLine-cus')) {//안들어옴
          area[i].width = 832;
          area[i].height = 540;
        }
        this.context = area[i].getContext("2d");

        if (this.context) {
          this.context.strokeStyle = this.style.lineColor;
          this.context.lineWidth = this.style.lineWidth;
          this.context.lineCap = this.style.lineCap;
          this.context.lineJoin = this.style.lineJoin;
          this.context.save();
        }
        return area[i];
      }
    }

    setStyle(opts) {
      console.log("opts",opts)
      for (let i = 0; i < 2; i++) {
        return {
          lineColor: opts.lineColor || "tomato",
          lineWidth: opts.lineWidth || 8,
          lineCap: opts.lineCap || "round",
          lineJoin: opts.lineJoin || "round",
        };
      }
    }

    setOptions(array) {
      const newArray = {};

      if (array !== "") {
        if (array instanceof Array)
        array.forEach((option) => (newArray[option] = true));
      else newArray[array] = true;
    }

      return newArray;
    }

    getIsCallback(name) {
      return this.callback && this.callback[name];
    }

    draw({ start, end, lineDash }) {
      // this.context.setLineDash(lineDash && lineDash.length > 0 ? lineDash : []);
      if (lineDash && lineDash.length > 0) {
        this.dashedLine(start, end, lineDash);
      } else {
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.closePath();
        this.context.stroke();
        this.context.save();
      }
    }

    /**
     * 점선 그리기
     * (setLineDash가 생각과는 다르게 동작하여 간격을 두고 그리는 것으로 변경)
     * @param {*} start
     * @param {*} end
     * @param {*} dashArr
     */
    dashedLine(start, end, dashArr) {
      // get the normalised line vector from start to end
      var nx = end.x - start.x;
      var ny = end.y - start.y;
      const dist = Math.sqrt(nx * nx + ny * ny); // get the line length
      nx /= dist;
      ny /= dist;
      var dashIdx = 0; // the index into the dash array
      var i = 0; // the current line position in pixels
      this.context.beginPath(); // start a path
      while (i < dist) {
        // do while less than line length
        // get the line seg dash length
        var dashLen = dashArr[dashIdx++ % dashArr.length];
        // draw the dash
        this.context.moveTo(start.x + nx * i, start.y + ny * i);
        i = Math.min(dist, i + dashLen);
        this.context.lineTo(start.x + nx * i, start.y + ny * i);
        // add the spacing
        i += dashArr[dashIdx++ % dashArr.length];
        if (i <= 0) {
          // something is wrong so exit rather than endless loop
          break;
        }
      }
      this.context.stroke(); // stroke
    }

    /**
     * 마지막 그린 선의 위치, 선 종류를 변경
     * @param {*} start
     * @param {*} end
     * @param {*} lineDash 선 간격
     */
    replaceLastSavedLine(start, end, lineDash) {
      const line = { start, end, lineDash };
      this.savedLines.splice(this.savedLines.length - 1, 1, line);
      this.refreshCanvas();
    }

    saveLine() {
      this.savedLines.push({
        start: this.startPointer,
        end: this.endPointer,
      });
    }

    drawSavedLines() {
      this.savedLines.forEach((path) => {
        this.draw({
          start: path.start,
          end: path.end,
          lineDash: path.lineDash,
        });
      });
    }

    getMovedPointer(DRAGDROP) {
      return {
        x:
          this.startPointer.x +
          (DRAGDROP.moveData.x - DRAGDROP.startData.x) / this.zoomRate,
        y:
          this.startPointer.y +
          (DRAGDROP.moveData.y - DRAGDROP.startData.y) / this.zoomRate,
      };
    }

    getDrawingStartPointer(newData) {
      return {
        x:
          (getPointer(newData).x -
            this.container.getBoundingClientRect().left) /
          this.zoomRate,
        y:
          (getPointer(newData).y - this.container.getBoundingClientRect().top) /
          this.zoomRate,
      };
    }

    start(DRAGDROP) {
      this.startPointer = this.isDrawingMode
        ? this.getDrawingStartPointer(DRAGDROP.startData)
        : getPointer(DRAGDROP.startObj.style, {
          x: DRAGDROP.startObj.style.centerX,
          y: DRAGDROP.startObj.style.centerY,
        });

      this.context.moveTo(this.startPointer.x, this.startPointer.y);
      this.context.beginPath();

      this.endPointer = null;

      this.getIsCallback("start") && this.callback.start(this);
    }

    move(DRAGDROP, newData) {
      this.endPointer = this.isDrawingMode
        ? this.getMovedPointer(DRAGDROP)
        : getPointer(newData, {
          x: DRAGDROP.startObj.style.centerX,
          y: DRAGDROP.startObj.style.centerY,
        });

      if (this.context) {
        if (this.isDrawingMode) {
          this.context.lineTo(this.endPointer.x, this.endPointer.y);
          this.context.stroke();
        } else {
          this.refreshCanvas();
          this.draw({
            start: this.startPointer,
            end: this.endPointer,
          });
        }
      }

      this.container.style.zIndex = 10;

      this.getIsCallback("move") && this.callback.move(this);
    }

    end(DRAGDROP) {
      this.container.style.zIndex = "";
      this.getIsCallback("end") && this.callback.end(this);
    }

    out(DRAGDROP) {
      this.container.style.zIndex = "";
      this.refreshCanvas();
      this.getIsCallback("out") && this.callback.out(this);
    }

    correct(DRAGDROP) {
      if (!this.isDrawingMode && !this.options.free) {
        this.endPointer = getPointer(DRAGDROP.currentObj.style, {
          x: DRAGDROP.currentObj.style.centerX,
          y: DRAGDROP.currentObj.style.centerY,
        });
      }

      if (!this.endPointer) this.endPointer = this.startPointer;

      const isSamePointer =
        this.endPointer.x === this.startPointer.x &&
        this.endPointer.y === this.startPointer.y;

      if (this.context) {
        if (!this.options.copy) DRAGDROP.startObj.resetPosition();

        this.refreshCanvas();
        if (!isSamePointer)
          this.draw({
            start: this.startPointer,
            end: this.endPointer,
          });
      }

      if (!isSamePointer) {
        this.sideLines.push({
          start: this.startPointer,
          end: this.endPointer,
          line: getLine(this.startPointer, this.endPointer),
        });
        this.saveLine();
      }
      if (this.endPointer.x && this.endPointer.y) {
        this.resetButton.classList.remove("displayN");
      }
      console.log("corrctDraw", this.startPointer)///수정중
      for(let i = 0; i < this.answer.length; i++){
        console.log("QWE", i)
        console.log(this.answer[i].start)
        console.log(this.startPointer)
       if(this.answer[i].start == this.startPointer){
        console.log("????",i)
       }
      }
      this.getIsCallback("correct") && this.callback.correct(this);
    }

    incorrect() {
      if (this.context) this.refreshCanvas();
      this.getIsCallback("incorrect") && this.callback.incorrect(this);
    }

    refreshCanvas() {
      this.clearCanvas();
      this.drawSavedLines();
    }

    clearCanvas() {
      this.context.clearRect(0, 0, this.drawArea.width, this.drawArea.height);
    }

    showAnswer() {
      var total;
      if (!this.answer) {
        alert("정답을 입력해주세요!");
        return;
      }

      if (this.customAnswer) {
        console.log("customAnswer");
      } else {
        if (this.testQuiz) {
          console.log("this", this);
          if (!this.startPointer || !this.endPointer) noAnswerPopupOpen();
          else if (
            this.startPointer.x == 0 ||
            this.startPointer.y == 0 ||
            this.endPointer.x == 0 ||
            this.endPointer.y == 0
          )
            noAnswerPopupOpen();
          else {
            this.isComplete = true;
            this.clearCanvas();
            this.context.strokeStyle = "#0060e3";
            this.answer.forEach((path) =>
              this.draw({
                start: path.start,
                end: path.end,
                lineDash: path.lineDash,
              })
            );
            this.container.classList.add("pointerOff");
            this.resetButton && this.resetButton.classList.add("displayN");
            this.answerButton && this.changeAnswerButtonState("reset");

            // 콜백 이벤트
            const DrawLineShowAnswerEvent = new Event("DrawLineShowAnswer");
            document.dispatchEvent(DrawLineShowAnswerEvent);
          }
        } else {
          this.isComplete = true;
          this.clearCanvas();
          this.context.strokeStyle = "#0060e3";
          this.answer.forEach((path) =>
            this.draw({
              start: path.start,
              end: path.end,
              lineDash: path.lineDash,
            })
          );
          this.container.classList.add("pointerOff");
          this.resetButton && this.resetButton.classList.add("displayN");
          this.answerButton && this.changeAnswerButtonState("reset");
          setTimeout(() => {
            if (window.$pm.sliders[0].idx + 1 == window.$pm.sliders[0].length) {
              console.log(" !!!!! 마지막 페이지 탭 없는 = 퀴즈 완료");
              // window.$containerAPI.showNext();
              correctImg();
            } else {
                window.$pm.sliders[0].idx = window.$pm.sliders[0].idx + 1;
                window.$pm.sliders[0].changeMoves();
            }            
          }, this.delay*1000);
        }
      }

      this.getIsCallback("showAnswer") && this.callback.showAnswer(this);
    }

    reset(button) {
      this.isComplete = false;
      this.DRAGDROP.reset();
      this.setDrawArea();
      this.clearCanvas();
      this.sideLines = [];
      this.rightAngleLength = 0;
      this.savedLines = [];
      this.startPointer = { x: 0, y: 0 };
      this.endPointer = { x: 0, y: 0 };
      this.context.strokeStyle = this.style.lineColor;
      this.context.save();
      this.container.classList.remove("pointerOff");
      this.resetButton && this.resetButton.classList.add("displayN");
      this.answerButton && this.changeAnswerButtonState("answer");

      if (button == "answerButton") {
        this.getIsCallback("resetAnswer") && this.callback.resetAnswer(this);

        // 콜백 이벤트
        const DrawLineResetEvent = new Event("DrawLineReset");
        document.dispatchEvent(DrawLineResetEvent);
      } else this.getIsCallback("reset") && this.callback.reset(this);
    }
  }

  window.DrawLine = DrawLine;
})();
