window.addEventListener('load', function () {


  // 스타트 버튼
  var start_btn = this.document.querySelector('.btn_start')
  var start_page = this.document.querySelector('.start_page')
  var quiz_p = this.document.querySelectorAll('[class*="quiz_"]')

  start_btn.addEventListener('click', function () {
    quiz_p[0].classList.add('on')
    start_page.classList.add('off')
  })



  // OX퀴즈 컨테이너
  var ox_container = this.document.querySelector('[data-quiz="ox"]')
  var ox_answer = this.document.querySelectorAll('[data-quiz="ox"] [data-answer]')


  // 정답 클릭시
  ox_answer.forEach((function(answer,i){
    answer.addEventListener('click',function(){
      const quizBox = document.querySelectorAll('.quizBox')
      const answerBox = document.querySelectorAll('.quizBox.answer')

      quizBox[i].classList.add('off')
      answerBox[i].classList.add('dim')



    })
  }))







})