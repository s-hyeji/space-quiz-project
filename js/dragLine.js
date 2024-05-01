"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  'use strict';

  var OBJ_COMPLETE_CLASS = 'dragLineComplete';
  var MOVING_COMPLETE_CLASS = 'dragComplete';
  var ANSWER_ATTR = 'data-answer';
  var GROUP_ATTR = 'data-group';
  var COMPLETE_CNT_ATTR = 'data-complete-count';
  var TOTAL_COMPLETE_CNT_ATTR = 'data-total-complete-count';

  var dragLine =
    /*#__PURE__*/
    function () {
      function dragLine(QUIZ) {
        _classCallCheck(this, dragLine);

        this.QUIZ = QUIZ;
      }

      _createClass(dragLine, [{
        key: "init",
        value: function init() {
          this.initGame();
          this.initDragObjs();
          this.initSvg();
          this.initPopupOpenCallback();
        }
      }, {
        key: "initGame",
        value: function initGame() {
          var self = this;
          var container = this.QUIZ.container;
          var areas = container.querySelectorAll('.js-dragLineArea');
          var objs = container.querySelectorAll('.js-dragLineObj');
          this.game = initDragDrop({
            elements: {
              container: container,
              areas: areas,
              objs: objs
            },
            callbacks: {
              start: dragLine.startCallback,
              move: dragLine.moveCallback,
              movedOut: dragLine.movedOutCallback,
              end: dragLine.endCallback,
              getZoomRate: function getZoomRate() {
                return self.getZoomRate();
              }
            },
            movedOutCorrPx: 20
          });
          this.game.quiz = this;
          this.game.init();
          container.addEventListener('pointerup', function (e) {
            e.stopPropagation();
          });
        }
      }, {
        key: "initDragObjs",
        value: function initDragObjs() {
          var game = this.game;
          game.dragObjs.forEach(function (dragObj) {
            dragObj.answeredCnt = 0;
          });
        }
      }, {
        key: "initSvg",
        value: function initSvg() {
          var game = this.game;
          var svg = this.QUIZ.container.querySelector('.js-svgContainer');
          game.totalAnsweredCnt = 0;
          Object.defineProperties(game, {
            svg: {
              value: svg
            },
            lineNow: {
              get: function get() {
                return this._lineNow || null;
              },
              set: function set(line) {
                this._lineNow = line;
              }
            },
            createLine: {
              value: function value() {
                var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                this.svg.appendChild(line);
                this.lineNow = line;
                return line;
              }
            },
            drawLine: {
              value: function value(obj, area) {
                var line = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.lineNow;

                if (!line) {
                  return false;
                }

                var beginCoords = line.beginCoords || this.getLineBeginCoords(obj);
                var endCoords = line.endCoords || this.getLineEndCoords(area);
                line.setAttribute('x1', beginCoords.x);
                line.setAttribute('y1', beginCoords.y);
                line.setAttribute('x2', endCoords.x);
                line.setAttribute('y2', endCoords.y);
                return line;
              }
            },
            removeLine: {
              value: function value() {
                var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lineNow;

                if (!line) {
                  return false;
                }

                this.svg.removeChild(line);

                if (this.lineNow) {
                  this.lineNow = null;
                }
              }
            },
            getLineBeginCoords: {
              value: function value() {
                var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.movingObj;
                var line = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.lineNow;

                if (!(obj || !line)) {
                  return false;
                }

                var coords = obj.offsets;
                line.beginCoords = coords;
                return coords;
              }
            },
            getLineEndCoords: {
              value: function value() {
                var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.movingObj;
                var line = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.lineNow;

                if (!(obj || !line)) {
                  return false;
                }

                var coords = obj.offsets;
                line.endCoords = coords;
                return coords;
              }
            },
            getMatchingObjOrArea: {
              value: function value(objOrArea) {
                var constructorIsObj = objOrArea.constructor.toString().indexOf('DragObj') > -1;
                var type = constructorIsObj ? 'obj' : 'area';
                var group = objOrArea.element.dataset.group;
                var answer = objOrArea.element.dataset.answer;
                var target = this.getSameGroupAndAnswer(type, group, answer);
                console.log("????????")
                return target;
              }
            },
            getSameGroupAndAnswer: {
              value: function value(type, group, answer) {
                var array = type === 'obj' ? this.dropAreas : this.dragObjs;
                var returnObj;
                array.forEach(function (obj) {
                  if (group === obj.element.dataset.group && answer === obj.element.dataset.answer) {
                    returnObj = obj;
                  }
                });
                return returnObj;
              }
            },
            getSameName: {
              value: function value(type, name) {
                var array = type === 'obj' ? this.dropAreas : this.dragObjs;
                var returnObj;
                array.forEach(function (obj) {
                  if (name === obj.name) {
                    returnObj = obj;
                  }
                });
                return returnObj;
              }
            },
            checkAndDisableDragObjs: {
              value: function value(array) {
                array.forEach(function (obj) {
                  var CNT_IS_OVER = checkObjCntIsOver(obj);

                  if (CNT_IS_OVER) {
                    obj.disable(true);
                  }
                });
              }
            }
          });
        }
      }, {
        key: "initPopupOpenCallback",
        value: function initPopupOpenCallback() {
          var _this = this;

          var self = this;

          if (!window.$popupCallBack) {
            window.$popupCallBack = {};
          }

          window.$popupCallBack.open = function (popup) {
            if (popup.Mode === 'pageChange') _this.popupOpenCallback();
          };
        }
      }, {
        key: "endCorrect",
        value: function endCorrect() {
          console.log(' !!!!! endCorrect = ');
          var game = this.game;
          var startedObj = game.movingObj;
          var endedArea = game.droppedArea; // const startedArea = game.getMatchingObjOrArea(startedObj);

          var endedObj = game.getMatchingObjOrArea(endedArea);
          startedObj.answeredCnt++;
          endedObj.answeredCnt++;
          game.totalAnsweredCnt++;
          game.checkAndDisableDragObjs([startedObj, endedObj]);
          game.getLineEndCoords(endedArea);
          game.drawLine();
          startedObj.resetPosition();
          var GAME_ENDED = checkTotalCompleted(game);
          console.log(' !!!!! GAME_ENDED = ', GAME_ENDED);
          if (GAME_ENDED) {
            if (this.QUIZ.answerBtn) {
              this.QUIZ.answerBtn.classList.add('reset');
            }
            // if ($ts.isThere('.popupContainer')) {
            //   let crrectSrc = $ts.getEl(".popupContainer .good")[0].getAttribute("data-good-sound");
            //   var crrectAudio;
            //   if (crrectSrc) {
            //     crrectAudio = $ts.createAudio.set(crrectSrc);
            //     crrectAudio.play();
            //   }
            //   else {
            //     crrectAudio = $ts.createAudio.set("../../../../../include/MAT/media/bobo_com3.mp3");
            //     crrectAudio.play();
            //   }
            //   $ts.addClass($ts.getEl('.popupContainer'), "on");
            //   $ts.addClass($ts.getEl('.good'), "on");
            // }

            // window.$pm.sliders[0].container.classList.add('complete');
            let currentPage = window.$pm.sliders[0].slides[window.$pm.sliders[0].idx];
            let time = currentPage.hasAttribute("data-autoSlide-time")
              ? currentPage.getAttribute("data-autoSlide-time") * 1000
              : 300;
            let touch = document.createElement('div')
            touch.classList.add('dontTouch')
            document.querySelector("#wrap").append(touch)
            if (window.$pm.sliders[0].idx + 1 == document.querySelector('.pageSlider_tabs').children.length) {
              console.log(' !!!!! 마지막 페이지 = 퀴즈 완료!');
              // window.$containerAPI.showNext();
              setTimeout(() => {
                document.querySelectorAll('.dontTouch').forEach(function (e) {
                  e.remove()
                })
                correctImg();
              }, time);
            } else {
              setTimeout(() => {
                document.querySelectorAll('.dontTouch').forEach(function (e) {
                  e.remove()
                })
                window.$pm.sliders[0].idx = window.$pm.sliders[0].idx + 1;
                window.$pm.sliders[0].changeMoves();
              }, time);
            }
            this.QUIZ.container.classList.add('complete');
          }
        }
      }, {
        key: "endWrong",
        value: function endWrong() {
          console.log('asdfasdfadsf')
          this.game.removeLine();
          this.game.movingObj.resetPosition();
        }
      }, {
        key: "showAnswer",
        value: function showAnswer() {
          var _this2 = this;

          var game = this.game;
          var objs = game.dragObjs;
          var areas = game.dropAreas;
          objs.forEach(function (obj) {
            obj.disable(true);
            areas.forEach(function (area) {
              area.disable(true);

              _this2.checkAnswersAndDrawLines(obj, area);
            });
          });
        }
      }, {
        key: "reset",
        value: function reset() {
          var game = this.game;
          var answerBtn = this.QUIZ.answerBtn;
          var RESET_ONLY = answerBtn && answerBtn.dataset.option && answerBtn.dataset.option.indexOf('resetOnly') > -1;

          if (RESET_ONLY) {
            answerBtn.classList.add('reset');
          }
          this.QUIZ.container.classList.remove('complete');

          this.game.totalAnsweredCnt = 0;
          this.resetAreas();
          this.resetObjs();
          this.resetSvg();
          game.initDragObjsCoords();
          game.setZoomRate();
        }
      }, {
        key: "resetObjs",
        value: function resetObjs() {
          this.game.dragObjs.forEach(function (obj) {
            obj.answeredCnt = 0;
            obj.disable(false);
            obj.element.classList.remove(OBJ_COMPLETE_CLASS);
            obj.element.classList.remove(MOVING_COMPLETE_CLASS);
          });
        }
      }, {
        key: "resetAreas",
        value: function resetAreas() {
          this.game.dropAreas.forEach(function (area) {
            area.element.classList.remove(MOVING_COMPLETE_CLASS);
            area.disable(false);
          });
        }
      }, {
        key: "resetSvg",
        value: function resetSvg() {
          var game = this.game;
          var svg = game.svg;
          var lines = svg.querySelectorAll('line');

          for (var i = 0, len = lines.length, line; i < len; i++) {
            line = lines[i];
            game.removeLine(line);
          }
        }
      }, {
        key: "popupOpenCallback",
        value: function popupOpenCallback() {
          var game = this.game;
          this.reset();
          game.initDragObjsCoords();
          game.setZoomRate();
        }
      }, {
        key: "getZoomRate",
        value: function getZoomRate() {
          var NO_UI = document.querySelector('html').classList.contains('noUI');

          if (!NO_UI) {
            return {
              x: 1,
              y: 1
            };
          }

          var wrap = document.getElementById('wrap');
          var transformVal = wrap.style.transform;
          var tempArr = dragLine.convertScaleStringToArray(transformVal);
          return {
            x: tempArr[0],
            y: tempArr[1]
          };
        }
      }, {
        key: "checkAnswersAndDrawLines",
        value: function checkAnswersAndDrawLines(obj, area) {
          var game = this.game;
          var ANSWERED = checkAnswers(obj, area);
          var SAME_GROUP = checkGroup(obj, area);

          if (ANSWERED && !SAME_GROUP) {
            var CNT_IS_OVER = checkObjCntIsOver(obj);

            if (!CNT_IS_OVER) {
              game.createLine();
              game.drawLine(obj, area);
              obj.answeredCnt++;
            }
            game.container.element.classList.add('complete');
          }
        }
      }], [{
        key: "startCallback",
        value: function startCallback(dragLine) {
          if (dragLine.movingObj) {
            dragLine.createLine();
            dragLine.getLineBeginCoords();
          }
        }
      }, {
        key: "moveCallback",
        value: function moveCallback(dragLine) {
          dragLine.getLineEndCoords();
          dragLine.drawLine();
        }
      }, {
        key: "movedOutCallback",
        value: function movedOutCallback(DragDropCore) {
          DragDropCore.removeLine();
        }
      }, {
        key: "endCallback",
        value: function endCallback(dragLine) {
          var obj = dragLine.movingObj;
          var area = dragLine.droppedArea;
          var quiz = dragLine.quiz;
          var ANSWERED = checkAnswers(obj, area);
          var SAME_GROUP = checkGroup(obj, area);

          if (area && ANSWERED && !SAME_GROUP) {
            obj.element.classList.add(MOVING_COMPLETE_CLASS);
            area.element.classList.add(MOVING_COMPLETE_CLASS);
            window.$efSound.correct();
            quiz.endCorrect();

            if (window.$callBack && window.$callBack.dragLineCorrect) window.$callBack.dragLineCorrect(dragLine);

          } else {
            window.$efSound.incorrect();
            // wrongImg();
            quiz.endWrong();

            if (window.$callBack && window.$callBack.dragLineWrong) window.$callBack.dragLineWrong(dragLine);
          }
        }
      }, {
        key: "convertScaleStringToArray",
        value: function convertScaleStringToArray(scaleString) {
          var arr1 = scaleString.split(',');
          var x = arr1[0].split('(')[1];
          var y = x;
          return [x, y].map(function (item) {
            return parseFloat(item.trim());
          });
        }
      }]);

      return dragLine;
    }();

  window.$dragLine = dragLine;

  function checkAnswers(obj, area) {
    if (!area) {
      return false;
    }
    var objAnsString = obj.element.getAttribute(ANSWER_ATTR) || '';
    var objAnswerArr = switchStringNumListToArray(objAnsString, ',');
    var areaAnsString = area.element.getAttribute(ANSWER_ATTR) || '';
    var areaAnswerArr = switchStringNumListToArray(areaAnsString, ',');
    return objAnswerArr.some(function (objAnswer) {
      return areaAnswerArr.some(function (areaAnswer) {
        return objAnswer === areaAnswer;
      });
    });
  }

  function checkGroup(obj, area) {
    if (!area) {
      return false;
    }

    var objGroup = parseInt(obj.element.getAttribute(GROUP_ATTR)) || 0;
    var areaGroup = parseInt(area.element.getAttribute(GROUP_ATTR)) || 0;
    return objGroup === areaGroup;
  }

  function checkObjCntIsOver(obj) {
    var COMPLETE_CNT = parseInt(obj.element.getAttribute(COMPLETE_CNT_ATTR)) || 1;
    var ANSWERED_CNT = obj.answeredCnt;
    return ANSWERED_CNT >= COMPLETE_CNT;
  }

  function checkTotalCompleted(game) {
    console.log(' !!!!! game.container.element = ', game.container.element);
    console.log(' !!!!! TOTAL_COMPLETE_CNT_ATTR = ', TOTAL_COMPLETE_CNT_ATTR);
    var TOTAL_COMPLETE_CNT = parseInt(game.container.element.getAttribute(TOTAL_COMPLETE_CNT_ATTR) || '') || 0;
    console.log(' !!!!! game.totalAnsweredCnt = ', game.totalAnsweredCnt, ' === TOTAL_COMPLETE_CNT = ', TOTAL_COMPLETE_CNT);
    return game.totalAnsweredCnt === TOTAL_COMPLETE_CNT;
  }
})();
