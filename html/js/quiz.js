var start_btn = this.document.querySelector('.btn_start')
var start_page = this.document.querySelector('.start_page')
var quiz_p = this.document.querySelectorAll('[class*="quiz_"]')
var quizBox = document.querySelectorAll('.quizBox')
var popup = document.querySelector('.popup_container')
var next_btn = this.document.querySelector('.popup_container .nextBtn')
var goodJop_popup = this.document.querySelector('.popup_container .goodJop_popup')


// 스타트버튼 클릭시
start_btn.addEventListener('click', function () {
    quiz_p[0].classList.add('on')
    start_page.classList.add('off')
})



// 해당페이지가 마지막인지 구분
function lastPage() {
    let thisPage = document.querySelector('[class*="quiz_"].on')
    let lastPage = quiz_p[quiz_p.length - 1];
    if (thisPage !== lastPage) {
        next();
    } else {
        // 마지막일시 함수 개별
        last();
    }
}

// console.log()
if (document.querySelector('.popup_container .nextBtn') === null) {
} else {
    // 다음퀴즈 버튼 클릭시
    next_btn.addEventListener('click', function () {
        nextPage();
    })
}


// 다음 퀴즈만! on
function nextPage() {
    let thisPage = document.querySelector('[class*="quiz_"].on')
    let lastPage = quiz_p[quiz_p.length - 1];
    if (thisPage !== lastPage) {
        console.log("해당페이지 확인", thisPage);
        popup.classList.remove('dim')
        next_btn.classList.remove('on')
        setTimeout(() => {
            quizBox.forEach(this_e => { this_e.classList.remove('off') });
        }, 1000);

        thisPage.classList.remove('on')
        thisPage.nextElementSibling.classList.add('on')

        return;
    } else {
        console.log("마지막 문제입니다.");
    }
}

// 참잘했어요 공통 함수
function goodJopPopup() {
    let lastPage = quiz_p[quiz_p.length - 1];
    if (lastPage.classList.contains('complete')) {
        popup.classList.add('dim')
        goodJop_popup.classList.add('on')
    }
}
