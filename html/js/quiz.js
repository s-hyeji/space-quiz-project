var wrap = document.querySelector('#wrap');
var goHome_btn = this.document.querySelector('.goHome')
var start_page = this.document.querySelector('.start_page')
var start_btn = this.document.querySelector('.btn_start')
var quiz_p = this.document.querySelectorAll('[class*="quiz_"]')
var quizBox = document.querySelectorAll('.quizBox')
var popup = document.querySelector('.popup_container')
var next_btn = this.document.querySelector('.popup_container .nextBtn')
var goodJop_popup = this.document.querySelector('.popup_container .goodJop_popup')




// 홈버튼
// goHome_btn.addEventListener('mouseover', function () { hoverSound(); })


// 스타트버튼 클릭시
start_btn.addEventListener('click', function () {
    clickSound();
    quiz_p[0].classList.add('on')
    start_page.classList.add('off')
    popup.style.transition = ""
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
    // next_btn.addEventListener('mouseover', function () { hoverSound(); })
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
        let goHome = document.createElement("button")
        let goReset = document.createElement("button")

        // 굿잡 팝업 html 생성
        popup.classList.add('dim')
        popup.appendChild(goodPopup)
        goodPopup.classList.add('goodJop_popup', 'on')
        goodPopup.appendChild(char01)
        char01.classList.add('char_01')
        setTimeout(() => { char01.classList.add('on') }, 1000);
        setTimeout(() => { goodJopSound(); }, 1000);

        setTimeout(() => {
            goodPopup.appendChild(goHome)
            goodPopup.appendChild(goReset)
            goHome.classList.add('goHome', "goButton")
            goReset.classList.add('goReset', "goButton")
        }, 3000);

        goHome.addEventListener('click', function () {
            clickSound();
            setTimeout(() => { window.location.href = '../index.html' }, 500);
        })
        goReset.addEventListener("click", function () {
            clickSound();
            setTimeout(() => { resetMain(); }, 500);
            
        })
    }
}

// 참잘했어요 공통 함수 -> 페이지에 complete 설정 안할 시  이거 사용. 
function goodJopPopup2() {
    let lastPage = quiz_p[quiz_p.length - 1];

    let goodPopup = document.createElement("div")
    let char01 = document.createElement("div")
    let goHome = document.createElement("button")
    let goReset = document.createElement("button")


    // 굿잡 팝업 태그 생성
    popup.classList.add('dim')
    popup.appendChild(goodPopup)
    goodPopup.classList.add('goodJop_popup', 'on')
    goodPopup.appendChild(char01)
    char01.classList.add('char_01')
    setTimeout(() => { char01.classList.add('on') }, 1000);
    setTimeout(() => { goodJopSound(); }, 1000);

    setTimeout(() => {
        goodPopup.appendChild(goHome)
        goodPopup.appendChild(goReset)
        goHome.classList.add('goHome', "goButton")
        goReset.classList.add('goReset', "goButton")
    }, 3000);
    setTimeout(() => {
        lastPage.classList.remove("on")
        start_page.classList.remove("off")
    }, 3100);

    goHome.addEventListener('click', function () {
        clickSound();
        setTimeout(() => { window.location.href = '../index.html' }, 500);
    })
    goReset.addEventListener("click", function () {
        clickSound();
        setTimeout(() => { resetMain(); }, 500);
    })
}

function resetMain() {
    const goodJop_popup = document.querySelector(".goodJop_popup")
    
    // 공통 참잘했어요 팝업 없애기
    if (goodJop_popup.classList.contains("on")) {
        popup.removeChild(goodJop_popup);
        popup.classList.remove("dim")
        popup.style.transition = "0s"
    }
    // 드래그라인일시
    if (wrap.classList.contains("dragLine")) {
        let quizAll = document.querySelectorAll(".lineQuiz div.complete");

        lines = [];
        clearCanvas()

        quizAll.forEach(function (all) {
            all.classList.remove("complete");
            // console.log(all);
            all.style.top = "";
            all.style.left = "";
        })
    };

    //  OX퀴즈
    if (wrap.classList.contains("ox")) {
        let ox_container = document.querySelectorAll('[data-quiz="ox"]')
        let quizBox = document.querySelectorAll('.quizBox')
        let answerBox = document.querySelectorAll('.quizBox.answer')
        let ox_btn = document.querySelectorAll('.quizBox [class*="btn_icon"]')

        start_page.classList.remove("off")
        ox_container.forEach(function(OX_QUIZ){ OX_QUIZ.classList.remove('on','complete') });
        quizBox.forEach(function(OX_QUIZBOX){ OX_QUIZBOX.classList.remove('off') });
        answerBox.forEach(function(OX_ANSWERBOX){ OX_ANSWERBOX.classList.remove('dim') });
        ox_btn.forEach(function(OX_BTN){ OX_BTN.classList.remove('on') });
    }

}

// 전부 입력해! 미니팝업
function miniPopup1() {
    let miniPopup = document.createElement("div")
    let char06 = document.createElement("div")
    let notice = document.createElement("p")

    // 굿잡 팝업 태그 생성
    popup.classList.add('dim')
    popup.appendChild(miniPopup)
    miniPopup.classList.add('miniPopup', 'notice')
    miniPopup.prepend(char06)
    miniPopup.appendChild(notice)
    char06.classList.add('char_06')
    notice.innerHTML = '정답을 모두<br>입력해야 해!'

    setTimeout(() => { miniPopupSound(); }, 200);
    setTimeout(() => { miniPopup.classList.add('on') }, 400);
    setTimeout(() => { popup.classList.remove('dim') }, 1700);
    setTimeout(() => { miniPopup.remove(); }, 1700);
}

// 다시한번 생각해봐! 미니팝업
function miniPopup2() {
    let miniPopup = document.createElement("div")
    let char06 = document.createElement("div")
    let notice = document.createElement("p")

    popup.classList.add('dim')
    popup.appendChild(miniPopup)
    miniPopup.classList.add('miniPopup', 'notice')
    miniPopup.prepend(char06)
    miniPopup.appendChild(notice)
    char06.classList.add('char_06')
    notice.innerHTML = '오답이야<br>다시 생각해봐!'

    setTimeout(() => { miniPopupSound(); }, 200);
    setTimeout(() => { miniPopup.classList.add('on') }, 400);
    setTimeout(() => { popup.classList.remove('dim') }, 1500);
    setTimeout(() => { miniPopup.remove(); }, 1500);
}












// =================================사운드 함수

// 정답 사운드
function corretSound() {
    let audio = new Audio('../common/media/correct.mp3')
    audio.preload = 'auto';
    audio.play();
    audio.volume = 0.3;
    console.log('정답사운드 재생');
}

// 오답 사운드
function wrongSound() {
    let audio = new Audio('../common/media/wrong.mp3')
    audio.preload = 'auto';
    audio.play();
    audio.volume = 0.1;
    console.log('오답사운드 재생');
}

// 마우스 클릭음
function clickSound() {
    let audio = new Audio('../common/media/click.mp3');
    audio.preload = 'auto';
    audio.play();
    audio.volume = 0.2;
}

// 슬라이드 효과음
function slideSound() {
    let audio = new Audio('../common/media/slide.mp3')
    audio.preload = 'auto';
    audio.play();
    audio.volume = 0.3;
}

// 굿잡팝업 사운드
function goodJopSound() {
    let audio = new Audio('../common/media/goodjob.mp3')
    audio.preload = 'auto';
    audio.play();
    audio.volume = 0.3;
}

// 로켓 사운드
function roketSound() {
    let audio = new Audio('../common/media/roket.mp3')
    audio.preload = 'auto';
    audio.play();
    audio.volume = 0.3;
}

// 미니팝업 사운드
function miniPopupSound() {
    let audio = new Audio('../common/media/miniPopup.mp3')
    audio.play();
    audio.volume = 0.3;
}

// 호버시 사운드
function hoverSound() {
    let audio = new Audio('../common/media/hoverSound.mp3')
    audio.play();
    audio.volume = 0.3;
}

