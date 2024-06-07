
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
})



// 인풋 value 체크 함수
function inputvaluecheck() {
  let emptyCount = 0;
  for (let i = 0; i < userinput.length; i++) {
    if (userinput[i].value.trim() === "") { emptyCount++; };
  };

  //  미입력 1개이상 일때 경고창
  if (emptyCount >= 1) { alert("정답을 모두 입력해주세요.") }
  //  전부 입력시
  else if (emptyCount === 0) { valueCompare(); }
}


// 정답시 팝업함수 오픈, 오답시 인풋 value 지우기
function valueCompare() {
  console.log('정답을 모두 입력했음=================================');

  for (let i = 0; i < userinput.length; i++) {
    if (userinput[i].value == userinput[i].getAttribute('answer')) {
      userinput[i].removeAttribute('hint')
      userinput[i].classList.add('readOnly')
    } else {
      userinput[i].value = ''
      userinput[i].classList.remove('hasText')
    }
  }
}

// 힌트오픈 함수
function inputHintOpen() {
  userinput.forEach(function (inputHint) {
    inputHint.setAttribute('hint', getHangulInitial(inputHint.getAttribute('answer')))



    let hintText = inputHint.getAttribute('hint')
    if (hintText) {
      if (!inputHint.classList.contains('readOnly') && !inputHint.classList.contains('hasText')) {
        console.log('aaa', inputHint.className);
        inputHint.classList.add('hintOn');
        inputHint.value = hintText;
        setTimeout(() => {
          inputHint.classList.remove('hintOn');
          inputHint.value = '';
        }, 1000);
      }
    }
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
  INPUT.addEventListener('keydown', function () {
    INPUT.classList.add('hasText')
    // console.log('키보드 keyCode', event.keyCode);
    if (event.keyCode == 8) {
      // console.log('인풋값 없음');
      INPUT.classList.remove('hasText')
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
    setTimeout(() => { goodJopPopup(); }, 1000);
  }
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
      // console.log("확인", targets);
    });
  })

  obj.addEventListener("mouseout", function () {
    obj.classList.remove("hover")
    targets.forEach(h => h.classList.remove('active'))
  })
})