
// 사용자 정답과 비교하기
const answer = document.querySelector(".answerBtn");
const userinput = document.querySelectorAll("input")

answer.addEventListener("click", function () {
  inputvaluecheck();
})

// 인풋 value 체크 함수
function inputvaluecheck() {
  let emptyCount = 0;
  for (let i = 0; i < userinput.length; i++) {
    if (userinput[i].value.trim() === "") {
      emptyCount++;
      console.log(emptyCount)
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

// 수진님 여기다가 정답체킹 해주세요 
//정답시 팝업함수 뜨고 틀리면 ..( 틀렸단 알림과) + 인풋 value 지우기
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
      console.log(userinput[i].value);
      userinput[i].value = "";
      e = e + 1;
    }
    if (e == 0) {
      console.log('정답~~');
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