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
  var ox_answer = this.document.querySelectorAll('[data-quiz="ox"] [data-answer]')


  // 정답 클릭시
  ox_answer.forEach((function (answer, i) {

    console.log('정답!')


    answer.addEventListener('click', function () {
      quizBox[i].classList.add('off')
      answerBox[i].classList.add('dim')
      setTimeout(() => { popup.classList.add('dim') }, 3000);
    })
  }))


  // 오답 클릭시(대기)



  // ▼ 팝업 영역======================================================= //

  // 다음퀴즈 버튼 클릭시
  next_btn.addEventListener('click', function () {
    popup.classList.remove('dim')
    setTimeout(() => {
      quizBox.forEach(this_e => { this_e.classList.remove('off') });
      answerBox.forEach(this_e => { this_e.classList.remove('dim') });
    }, 1000);

    // 다음 퀴즈만! on
  })



    console.log('li들',quiz_p);

})