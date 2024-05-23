// 혜지 추가

// 사용자 정답과 비교하기
const answer = document.querySelector(".answerBtn");

answer.addEventListener("click", function () {
  inputvaluecheck();
})

function inputvaluecheck() {
  const userinput = document.querySelectorAll("input")
  let emptyCount = 0;
  for (let i = 0; i < userinput.length; i++) {
    if (userinput[i].value.trim() === "") {
      emptyCount++;
      console.log(emptyCount)
    };
  };

  if (emptyCount >= 1) {
    console.log("호ㅓㅏㄱ인")
    alert("정답을 모두 입력해주세요.")
  }

}

// 힌트 함수
function getHangulInitial(char) {
  const cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  const code = char.charCodeAt(0) - 44032;
  const initialIndex = Math.floor(code / 588);
  return cho[initialIndex];
}
