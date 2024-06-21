
// 사용자 정답과 비교하기
var quizPage = document.querySelector('.quiz_1')
const answerBtn = document.querySelector(".answerBtn");
const hintBtn = document.querySelector(".hintBtn");
const userinput = document.querySelectorAll("input")


answerBtn.addEventListener("click", function () {
  inputvaluecheck();
  inputQuizComplete();
  clickSound();
})

hintBtn.addEventListener("click", function () {
  inputHintOpen();
  clickSound();

  document.querySelectorAll('.btnBox').forEach(function (BTN) {
    BTN.style.pointerEvents = 'none'
    setTimeout(() => { BTN.removeAttribute('style') }, 1000);
  })
})



// 인풋 value 체크 함수
function inputvaluecheck() {
  let emptyCount = 0;
  for (let i = 0; i < userinput.length; i++) {
    if (userinput[i].value.trim() === "") { emptyCount++; };
  };

  //  미입력 1개이상 일때 경고창
  if (emptyCount >= 1) { miniPopup1(); }
  //  전부 입력시
  else if (emptyCount === 0) { valueCompare(); }
}


// 정답시 팝업함수 오픈, 오답시 인풋 value 지우기
function valueCompare() {
  console.log('정답을 모두 입력했음=================================');
  // 오답 횟수 체크
  for (let i = 0; i < userinput.length; i++) {
    if (userinput[i].value && userinput[i].getAttribute('answer')) {
      minPop2Check = minPop2Check+1;
      break;
    }
  }
  for (let i = 0; i < userinput.length; i++) {
    let answerSave = userinput[i].getAttribute('answer');
    if (userinput[i].value == userinput[i].getAttribute('answer')) {
      // 정답일때
      userinput[i].removeAttribute('hint')
      userinput[i].classList.add('readOnly')
  
    } else {
      // 두번 오답일때 정답확인으로 버튼 바뀜
      if (minPop2Check == 2) {
        console.log('2회 오답')
        userinput[i].value = ''
        userinput[i].classList.remove('hasText')
        document.querySelector('.answerBtn').innerHTML= '정답 확인';
      }
      // 세번 오답일때 정답 나타남
      else if (minPop2Check == 3) {
        console.log('3회 오답 ')
        userinput[i].value = answerSave;
        userinput[i].classList.add('readOnly2');
      } 
      // 첫번째 오답일때
      else {
        console.log('1회 오답')
        userinput[i].value = ''
        userinput[i].classList.remove('hasText')
      }
      }
      }
      // 오답 팝업complete
      if (minPop2Check == 3 && quizPage.classList.contains('complete') ) {

          console.log(quizPage);
          console.log('3회 오답 팝업')
          miniPopup3(); 
        minPop2Check = 0;
      } else if (minPop2Check < 3) {
        console.log('1,2회 팝업')
        miniPopup2(); 
      }
}

// 힌트오픈 함수
function inputHintOpen() {
  userinput.forEach(function (inputHint) {
    inputHint.setAttribute('hint', getHangulInitial(inputHint.getAttribute('answer')))
    for (let i = 0; i < userinput.length; i++) {
      let hintText = userinput[i].getAttribute('hint')

      if (userinput[i].classList.contains('readOnly') || userinput[i].classList.contains('hasText')) {
        if (userinput[i].value == userinput[i].getAttribute('answer')) {
          userinput[i].removeAttribute('hint')
          userinput[i].classList.add('readOnly')
        } else {
          userinput[i].classList.add('hintOn');
          userinput[i].value = hintText;
          setTimeout(() => {
            userinput[i].classList.remove('hintOn');
            userinput[i].value = '';
          }, 1000);
        }
      } else {
        userinput[i].classList.add('hintOn');
        userinput[i].value = hintText;
        setTimeout(() => {
          userinput[i].classList.remove('hintOn');
          userinput[i].value = '';
        }, 1000);
      }
    }
    // }
  })
}

// 힌트자음 배열함수
function getHangulInitial(char) {
  const jaum = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const code = char.charCodeAt(0) - 44032; //한글 자모마다 특정 숫자가 정해져있음 = 초중종성 합친 값 - 중성과 종성이 들어가려고 마련된 자리
  const initialIndex = Math.floor(code / 588); // 588은 잘 모르겠지만 해당숫자로 나누어 자음을 가져옴
  // console.log('>>>>>>>>>> 자음 가져오기', initialIndex);
  return jaum[initialIndex];
}



// 인풋 내 텍스트가 있을 경우 클래스 부여
userinput.forEach(function (INPUT) {
  INPUT.addEventListener("blur", function () {
    inputvalue = this.value;
    // console.log("혜지확인", inputvalue)
    if (inputvalue) {
      this.value
      // console.log("값이 있다");
      INPUT.classList.add("hasText")
    } else {
      // console.log("값이 없다")
      INPUT.classList.remove("hasText")
    }
  })


  // 최대글자 수 자름 
  INPUT.addEventListener('keyup', function () {
    if (this.value.length > this.getAttribute('maxlength')) {
      this.value = this.value.slice(0, 1)
    }
  })
})


// 정답확인 함수
function inputQuizComplete() {
  let answerAttr = document.querySelectorAll('[answer]')
  let totalAnswer = answerAttr.length
  let totalCorrectCount = document.getElementsByClassName('readOnly').length

  if (totalAnswer === totalCorrectCount) {
    quizPage.classList.add('complete')
    corretSound();
    setTimeout(() => { goodJopPopup(); }, 1000);
  } else { wrongSound(); }
}


// 호버시 이벤트
const hoverObj = document.querySelectorAll("[hover-obj]");
let hoverTar = document.querySelectorAll("[hover-target]");
let num
var targets = [];

hoverObj.forEach(function (obj) {
  obj.addEventListener("mouseover", function () {
    num = parseInt(obj.getAttribute("hover-obj"), 10);
    targets = [];
    obj.classList.add("hover")

    targets.forEach(h => h.classList.remove('active'))
    hoverTar.forEach(function (t) {
      var hoverTargetValue = t.getAttribute('hover-target');
      if (hoverTargetValue) {
        var hoverTargetArray = hoverTargetValue.split(',').map(Number);
        if (hoverTargetArray.includes(num)) {
          targets.push(t);
        }
      }

      targets.forEach(h => h.classList.add("active"));
    });
    obj.addEventListener('click', function () {
      targets[0].querySelector('input').focus()
    })

  })

  obj.addEventListener("mouseout", function () {
    obj.classList.remove("hover")
    targets.forEach(h => h.classList.remove('active'))
  })
})


// input 키보드 이동
document.addEventListener('keydown', function (event) {
  let keyCode = event.keyCode || event.code;
  switch (keyCode) {
    case 37:
    case "ArrowLeft":
      moveInput('left');
      break;
    case 38:
    case "ArrowUp":
      moveInput('up');
      break;
    case 39:
    case "ArrowRight":
      moveInput('right');
      break;
    case 40:
    case "ArrowDown":
      moveInput('down');
      break;
    default:
      break;
  }
})
function moveInput(direction) {
  let table = document.querySelector('.inputTable')
  let rows = table.getElementsByTagName('tr')
  let array = []
  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName('td')
    let array2 = [];
    for (let j = 0; j < cells.length; j++) {
      array2.push(cells[j])
    }
    array.push(array2)
  }
  let rowNum;
  let colNum;
  let maxRow;
  let maxCol;
  let focus;
  for (let i = 0; i < array.length; i++) {
    maxRow = array.length;
    for (let j = 0; j < array[i].length; j++) {
      maxCol = array[i].length;
      if (document.activeElement === array[i][j].querySelector('input')) {
        focus = array[i][j];
        rowNum = i;
        colNum = j;
      }
    }
  }
  if (focus) {
    if (direction == 'up') {
      if (rowNum != 0) {
        if (array[rowNum - 1][colNum].querySelector('input')) {
          array[rowNum - 1][colNum].querySelector('input').focus();
        } else {
          return;
        }
      } else {
        return;
      }
    } else if (direction == 'down') {
      if (rowNum != maxRow) {
        if (array[rowNum + 1][colNum].querySelector('input')) {
          array[rowNum + 1][colNum].querySelector('input').focus();
        } else {
          return;
        }
      } else {
        return;
      }
    } else if (direction == 'left') {
      if (colNum != 0) {
        if (array[rowNum][colNum - 1].querySelector('input')) {
          array[rowNum][colNum - 1].querySelector('input').focus();
        } else {
          return;
        }
      } else {
        return;
      }
    } else if (direction == 'right') {
      if (colNum != maxCol) {
        if (array[rowNum][colNum + 1].querySelector('input')) {
          array[rowNum][colNum + 1].querySelector('input').focus();
        } else {
          return;
        }
      } else {
        return;
      }
    }
  } else {
    return;
  }
}


