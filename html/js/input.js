
// 사용자 정답과 비교하기
var quizPage = document.querySelector('.quiz_1')
const answerBtn = document.querySelector(".answerBtn");
const hintBtn = document.querySelector(".hintBtn");
const userinput = document.querySelectorAll("input")

answerBtn.addEventListener("click", function () {
  inputvaluecheck();
  inputQuizComplete();
})

hintBtn.addEventListener("click", function () {
  inputHintOpen();
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
    }
  }
}

// 힌트오픈 함수
function inputHintOpen() {
  userinput.forEach(function (inputHint) {
    inputHint.setAttribute('hint', getHangulInitial(inputHint.getAttribute('answer')))

    let hintText = inputHint.getAttribute('hint')
    if (hintText) {
      if (!inputHint.classList.contains('readOnly')) {
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
  const initialIndex = Math.floor(code / 588); // 588은 잘 모르겠지만 해당숫자로 나눠서 자음을 가져옴
  console.log('>>>>>>>>>> 자음 가져오기', initialIndex);

  return jaum[initialIndex];
}


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
