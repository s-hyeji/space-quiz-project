
// 사용자 정답과 비교하기
var quizPage = document.querySelector('.quiz_1')
const answer = document.querySelector(".answerBtn");
const userinput = document.querySelectorAll("input")

answer.addEventListener("click", function () {
  inputvaluecheck();
  // inputAddComplete();
  for (let i = 0; i < userinput.length; i++) {
    console.log('>>>>>', userinput[i].classList.length);
    if (userinput[i].classList.contains('correct') == true) {
      quizPage.classList.add('complete')
      // setTimeout(() => { goodJopPopup(); }, 500);
      console.log('컴플리트 붙음');
    } else {
      console.log('컴플리트 안붙음');
    }
  }
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
    valueCompare()
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
      console.log('오답');
      // console.log(userinput[i].value);
      userinput[i].value = "";
      e = e + 1;
    }
    if (e == 0) {
      console.log('정답');
      userinput.forEach(function (INPUT) {
        // console.log('>>>>>>>>>>>인풋 정답입력',INPUT.value);
        if (INPUT.value == true) {
        } else {
          INPUT.classList.add('correct')
        }
      })
    }
  }

  // 힌트 함수
  function getHangulInitial(char) {
    const cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const code = char.charCodeAt(0) - 44032;
    const initialIndex = Math.floor(code / 588);
    return cho[initialIndex];
  }
}


// function inputAddComplete() {
//   for (let i = 0; i < userinput.length; i++) {
//     console.log('>>>>>', userinput[i].classList.contains('correct'));
//     if (userinput[i].classList.contains('correct') === true) {
//       quizPage.classList.add('complete')
//       setTimeout(() => { goodJopPopup(); }, 500);
//       console.log('컴플리트 붙음');
//     } else {
//       console.log('컴플리트 안붙음');
//     }
//   }
// }