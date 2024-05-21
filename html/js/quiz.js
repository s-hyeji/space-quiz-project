var start_btn = this.document.querySelector('.btn_start')
var start_page = this.document.querySelector('.start_page')
var quiz_p = this.document.querySelectorAll('[class*="quiz_"]')

// 스타트버튼 클릭시
start_btn.addEventListener('click', function () {
    quiz_p[0].classList.add('on')
    start_page.classList.add('off')
})
