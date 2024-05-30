
// 사용자 정답과 비교하기
var quizPage = document.querySelector('.quiz_1')
const answer = document.querySelector(".answerBtn");
const userinput = document.querySelectorAll("input")

answer.addEventListener("click", function () {
  inputvaluecheck();
  inputQuizComplete();
})



// 인풋 value 체크 함수
function inputvaluecheck() {
  let emptyCount = 0;

  for (let i = 0; i < userinput.length; i++) {
    if (userinput[i].value.trim() === "") {
      emptyCount++;
      // console.log(emptyCount)
    };
  };



  //  하나 이상시 체킹하기
  if (emptyCount >= 1) {
    // console.log("확인")`
    alert("정답을 모두 입력해주세요.")
  } else if (emptyCount === 0) {
    // 모두 입력함
    valueCompare();
  }
}




// ▼ 수진 :: 정답시 팝업함수 뜨고 틀리면 ..( 틀렸단 알림과) + 인풋 value 지우기
function valueCompare() {
  console.log('정답을 모두 입력했음=================================');
  let userinputVal = [];
  let userinputAns = [];

  userinput.forEach(element => {
    userinputVal.push(element.value);
    userinputAns.push(element.getAttribute('answer'));
  });

  console.log(userinputAns);
  console.log(userinputVal);
  let e = 0;
  for (i = 0; i < userinputAns.length; i++) {
    if (userinputAns[i] != userinputVal[i]) {
      // console.log('오답');
      // console.log(userinput[i].value);
      // console.log('>>>>>>>>>>> 인풋 오답입력',e);
      userinput[i].value = "";
      e = 1;
    }
    if (e == 0) {
      // console.log('정답');
      // console.log('>>>>>>>>>>> 인풋 정답입력',e);
      console.log('>>>>>>>>>>> 인풋 값', userinput[i].value);
      userinput[i].classList.add('correct')
    }
  }
}

// 힌트 함수
function getHangulInitial(char) {
  const cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const code = char.charCodeAt(0) - 44032;
  const initialIndex = Math.floor(code / 588);
  return cho[initialIndex];
}

// 정답 함수
function inputQuizComplete() {
  let answerAttr = document.querySelectorAll('[answer]')
  let totalAnswer = answerAttr.length
  let totalCorrectCount = document.getElementsByClassName('correct').length
  console.log('정답 비율 :', totalAnswer + ':' + totalCorrectCount);
  // console.log('answer 갯수 :', totalAnswer);
  // console.log('correct 갯수 :', totalCorrectCount);

  if (totalAnswer === totalCorrectCount) {
    quizPage.classList.add('complete')
    // setTimeout(() => { goodJopPopup(); }, 500);
    console.log('컴플리트 ON');
  } 
}
