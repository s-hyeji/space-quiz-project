window.addEventListener('load', function () {


  // 지역선언
  var start_btn = this.document.querySelector('.btn_start')
  var start_page = this.document.querySelector('.start_page')
  var quiz_p = this.document.querySelectorAll('[class*="quiz_"]')
  var quizBox = document.querySelectorAll('.quizBox')
  var answerBox = document.querySelectorAll('.quizBox.answer')
  var popup = document.querySelector('.popup_container')
  var next_btn = this.document.querySelector('.popup_container .nextBtn')



  // 스타트버튼 클릭시
  start_btn.addEventListener('click', function () {
    quiz_p[0].classList.add('on')
    start_page.classList.add('off')
  })



  // ▼ OX퀴즈 영역======================================================= //
  var ox_container = this.document.querySelector('[data-quiz="ox"]')
  var ox_btn = this.document.querySelectorAll('[data-quiz="ox"] [class*="btn_icon"]')


  // ox버튼 클릭시
  ox_btn.forEach((function (ox_btn, i) {
    ox_btn.addEventListener('click', function () {
      // 정답 클릭시
      if (ox_btn.attributes.length === 2) {
        console.log('정답!')
        ox_container.classList.add('complete')
        this.classList.add('on')

        for (let i = 0; i < quizBox.length; i++) {
          quizBox[i].classList.add('off')
        }
        for (let i = 0; i < answerBox.length; i++) {
          answerBox[i].classList.add('dim')
          answerBox[i].classList.remove('off')
        }
        setTimeout(() => { popup.classList.add('dim') }, 3000);
      }
      
      // 오답 클릭시(대기)
      else {
        console.log('오답!')
      }
    })
  }))



  // ▼ 팝업 영역======================================================= //

  // 다음퀴즈 버튼 클릭시
  next_btn.addEventListener('click', function () {
    popup.classList.remove('dim')
    setTimeout(() => {
      quizBox.forEach(this_e => { this_e.classList.remove('off') });
      answerBox.forEach(this_e => { this_e.classList.remove('dim') });
    }, 1000);

    // 다음 퀴즈만! on
    let nextPage = document.querySelector('[class*="quiz_"].on')
    nextPage.classList.remove('on')
    nextPage.nextElementSibling.classList.add('on')
  })



  // console.log('li들', quiz_p);

})