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
    clickSound();
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
        clickSound();
        setTimeout(() => { slideSound(); }, 700);
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
            thisPage.classList.remove('on')
            thisPage.nextElementSibling.classList.add('on')
        }, 1000);
        return;
    } else {
        console.log("마지막 문제입니다.");
        // goodJopPopup();
    }
}

// 참잘했어요 공통 함수
function goodJopPopup() {
    let lastPage = quiz_p[quiz_p.length - 1];
    if (lastPage.classList.contains('complete')) {
        let goodPopup = document.createElement("div")
        let char01 = document.createElement("div")
        // 굿잡 팝업 html 생성
        popup.classList.add('dim')
        popup.appendChild(goodPopup)
        goodPopup.classList.add('goodJop_popup', 'on')
        goodPopup.appendChild(char01)
        char01.classList.add('char_01')
        setTimeout(() => { char01.classList.add('on') }, 1000);
        setTimeout(() => { goodJopSound(); }, 1000);
    }
}
// 참잘했어요 공통 함수 -> 페이지에 complete 설정 안할 시  이거 사용. 
function goodJopPopup2() {
    let goodPopup = document.createElement("div")
    let char01 = document.createElement("div")
    // 굿잡 팝업 html 생성
    popup.classList.add('dim')
    popup.appendChild(goodPopup)
    goodPopup.classList.add('goodJop_popup', 'on')
    goodPopup.appendChild(char01)
    char01.classList.add('char_01')
    setTimeout(() => { char01.classList.add('on') }, 1000);
    setTimeout(() => { goodJopSound(); }, 1000);

}




// =================================사운드 함수

// 정답 사운드
function corretSound() {
    let audio = new Audio('../../common/media/correct.mp3')
    audio.play();
}

// 오답 사운드
function wrongSound() {
    let audio = new Audio('../../common/media/wrong.mp3')
    audio.play();
}

// 마우스 클릭음
function clickSound() {
    let audio = new Audio('../../common/media/click.mp3')
    audio.play();
}

// 슬라이드 효과음
function slideSound() {
    let audio = new Audio('../../common/media/slide.mp3')
    audio.play();
}

// 굿잡팝업 사운드
function goodJopSound() {
    let audio = new Audio('../../common/media/goodjob.mp3')
    audio.play();
}
