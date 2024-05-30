
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
  userinput.forEach(function (inputHint,i) {
    // console.log('>>>>>>>>',userinput[i].getAttribute('hint'));
    let showHint = userinput[i].getAttribute('hint')
    console.log('>>>>>>>>',showHint);

    userinput[i].innerText(showHint)
    // console.log('>>>>>>>>',userinput[i].attributes[5].value);
  })
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
      userinput[i].classList.remove('fail')
      userinput[i].classList.add('readonly')
    } else {
      userinput[i].value = ''
      userinput[i].classList.add('fail')
    }
  }

  let fail = document.querySelectorAll('.fail')
  for (let k = 0; k < fail.length; k++) {
    fail[k].setAttribute('hint', getHangulInitial(fail[k].getAttribute('answer')))
  }
}

// 힌트 함수
function getHangulInitial(char) {
  const jaum = ["ㄴ", "ㅊ", "ㅍ", "ㄷ", "ㅈ", "ㅈ", "ㅅ", "ㅁ", "ㅎ", "ㄹ", "ㅇ", "ㅁ", "ㄱ"];
  const code = char.charCodeAt(0) - 44032;
  const initialIndex = Math.floor(code / 588);
  console.log('aaaaaaaaaaa', initialIndex);
  return jaum[initialIndex];
}


// 정답 함수
function inputQuizComplete() {
  let answerAttr = document.querySelectorAll('[answer]')
  let totalAnswer = answerAttr.length
  let totalCorrectCount = document.getElementsByClassName('readonly').length
  // console.log('정답 비율 :', totalAnswer + ':' + totalCorrectCount);
  // console.log('answer 갯수 :', totalAnswer);
  // console.log('correct 갯수 :', totalCorrectCount);
  if (totalAnswer === totalCorrectCount) {
    quizPage.classList.add('complete')
    setTimeout(() => { goodJopPopup(); }, 1000);
  }
}
