window.addEventListener('load', function () {


  // 지역선언
  var quizBox = document.querySelectorAll('.quizBox')
  var ox_btn = document.querySelectorAll('.quizBox [class*="btn_icon"]')
  var answerBox = document.querySelectorAll('.quizBox.answer')
  var popup = document.querySelector('.popup_container')
  var next_btn = this.document.querySelector('.popup_container .nextBtn')




  // ▼ OX퀴즈 영역======================================================= //
  // ox버튼 클릭시
  ox_btn.forEach((function (ox_btn, i) {
    ox_btn.addEventListener('click', function () {
      // 정답 클릭시
      if (ox_btn.attributes.length === 2) {
        console.log('정답!')
        this.classList.add('on')
        completeClass();
        for (let i = 0; i < quizBox.length; i++) { quizBox[i].classList.add('off') }
        for (let i = 0; i < answerBox.length; i++) {
          answerBox[i].classList.add('dim')
          answerBox[i].classList.remove('off')
        }
        setTimeout(() => { popup.classList.add('dim'); next_btn.classList.add('on') }, 3000);
        setTimeout(() => { goodJopPopup() }, 3000);
      }
      // 오답 클릭시(대기)
      else {
        console.log('오답!')
      }
    })
  }))


  // ▼ 함수 영역======================================================= //
  // 컴플리트class 추가
  function completeClass() {
    let ox_container = document.querySelectorAll('[data-quiz="ox"]')
    let ox_correct = document.querySelectorAll('[data-quiz="ox"] [data-answer]')

    for (let i = 0; i < ox_container.length; i++) {
      // console.log('>>>>>>>>', ox_correct[i].classList);
      if (ox_correct[i].classList.contains('on')) {
        ox_container[i].classList.add('complete')
      }
    }
  }



  // ▼ 팝업 영역======================================================= //
  // 다음퀴즈 버튼 클릭시
  next_btn.addEventListener('click', function () {
    setTimeout(() => {
      answerBox.forEach(this_e => { this_e.classList.remove('dim') });
    }, 1000);
  })
})