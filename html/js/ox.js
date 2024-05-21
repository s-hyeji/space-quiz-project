window.addEventListener('load', function () {


  // 지역선언
  var quiz_p = this.document.querySelectorAll('[class*="quiz_"]')
  var quizBox = document.querySelectorAll('.quizBox')
  var answerBox = document.querySelectorAll('.quizBox.answer')
  var popup = document.querySelector('.popup_container')
  var next_btn = this.document.querySelector('.popup_container .nextBtn')



  // ▼ OX퀴즈 영역======================================================= //
  var ox_container = this.document.querySelectorAll('[data-quiz="ox"]')
  var ox_btn = this.document.querySelectorAll('[data-quiz="ox"] [class*="btn_icon"]')


  // ox버튼 클릭시
  ox_btn.forEach((function (ox_btn, i) {
    ox_btn.addEventListener('click', function () {
      // 정답 클릭시
      if (ox_btn.attributes.length === 2) {
        console.log('정답!')

        this.classList.add('on')


        // 컴플리트 해결해야함!
        for (let i = 0; i < ox_container.self; i++) {
          ox_container[i].classList.add('complete')
        }




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
    setTimeout(() => {
      answerBox.forEach(this_e => { this_e.classList.remove('dim') });
    }, 1000);

  })



  // console.log('li들', quiz_p);

})