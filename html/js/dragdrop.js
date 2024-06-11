// Get the draggable element
var draggable;
let dropArea = document.querySelector(".dropArea")
// Variables to track mouse position and dragging state
var offsetX, offsetY;
var isDragging = false;
let droppedArea;
let scale;
let popup_container = document.querySelector('.popup_container');
let nextBtn = document.querySelector('.nextBtn');
let quizPages = document.querySelectorAll('.quizPage')
let page_tg = document.querySelectorAll('.spaceShip');




// 맨 처음 드래그 요소의 위치값을 저장해 둘 변수 
let pureOffsetX;
let pureOffsetY;



// 드래그를 시작한다.
function startDrag(e) {
  e.preventDefault()
  scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
  draggable = e.target;

  // 맨 처음 드래그 요소의 위치값을 저장해둔다.
  pureOffsetX = draggable.offsetLeft;
  pureOffsetY = draggable.offsetTop;

  // 드래그 요소의 좌상단 위치와 마우스 위치를 계산한다.
  offsetX = (e.clientX / scale) - draggable.offsetLeft + (draggable.style.width / 2);
  offsetY = (e.clientY / scale) - draggable.offsetTop + (draggable.style.height / 2);


  // isDragging의 값을 true로 만들어서 드래그를 시작한다.
  isDragging = true;

  // Add event listeners for mousemove and mouseup events
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

// Function to handle dragging
function drag(e) {
  //  console.log("확인", e);

  if (isDragging) {
    // Calculate new position of the draggable element
    var newX = (e.clientX / scale) - offsetX;
    var newY = (e.clientY / scale) - offsetY;

    // Set the new position  
    draggable.style.left = newX + 'px';
    draggable.style.top = newY + 'px';
  }
}

// Function to stop dragging
function stopDrag() {
  // Set dragging state to false
  checkAnswer();
  isDragging = false;

  // Remove event listeners for mousemove and mouseup events
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
}
function checkAnswer() {
  var draggableRect = draggable.getBoundingClientRect();
  let target = document.querySelectorAll(".dropArea")
  // 대상 오브젝트의 위치
  var targetRect = [];
  for (let i = 0; i < target.length; i++) {
    targetRect.push(target[i].getBoundingClientRect())
  }

  // 마우스의 위치
  var mouseX = event.clientX;
  var mouseY = event.clientY;
  let dropcheck = false;

  // console.log(targetRect[0] )
  // 마우스가 대상 오브젝트 위에 있는지 확인합니다.
  let quizPageOn = document.querySelectorAll('.quizPage.on');
  let quizPageOnFlag = true;
  
  if (quizPageOnFlag === true) {
    quizPageOn.forEach((quizPage, pageIndex) => {
      let spaceShips = quizPage.querySelectorAll('.spaceShip');
      spaceShips.forEach((spaceShip, i) => {
        let rect = spaceShip.getBoundingClientRect();
        if (mouseX >= rect.left && mouseX <= rect.right &&
            mouseY >= rect.top && mouseY <= rect.bottom) {
          dropcheck = true;
          droppedArea = spaceShip;
          console.log('정답');
          checking();
        } else {
          console.log('우주선 외 다른위치로 드롭했을때');
          wrongSound();
          draggable.style.left = pureOffsetX + 'px';
          draggable.style.top = pureOffsetY + 'px';
        }
      });
    });
  }
  
}
function endCallback() {
  let copy = draggable.cloneNode(true);
  copy.style.position = 'static'
  dropArea.append(copy)
}

function checking() {
  // draggable는 드래그할 요소 / droppedArea 드롭영역
  let dragans = draggable.getAttribute('drag-obj')
  let dropans = droppedArea.getAttribute('data-drop')

  //  console.log(dragans+'...dragans');
  //  console.log(dropans+'...dropans ');
  // console.log('드래그 속성', dragans);
  // console.log('드랍 속성', dragans);

  if (dragans === dropans) {
    console.log("정답>>>>>>>>>>>")
    correctStep_1();
    completeClass();
    corretSound()
  } else if (dragans != dropans) {
    console.log('오답>>>>>>>>>>>>')
    draggable.style.left = pureOffsetX + 'px';
    draggable.style.top = pureOffsetY + 'px';
    wrongSound();
  }

  function correctStep_1() {
    draggable.classList.add('correct');
    droppedArea.classList.add('correct');
    document.querySelector('main').classList.add('pointerNon')
    setTimeout(function () {
      // droppedArea.forEach(element => {
      if(droppedArea.closest('.quiz_1') ) {
        droppedArea.innerHTML = "토끼, 호랑이, 사슴, 무당벌레는<br> <span class='blue'>동물</span>입니다."
      }else if(droppedArea.closest('.quiz_2')){
        droppedArea.innerHTML = "장화, 구두, 운동화, 슬리퍼, 샌들은<br> <span class='blue'>신발</span>입니다."
      }else if(droppedArea.closest('.quiz_3')){
        droppedArea.innerHTML = "나는 오늘 학교에 <span class='blue'>갔다</span>."
      }else if(droppedArea.closest('.quiz_4')){
        droppedArea.innerHTML = "학교에서는 매일 책을 <span class='blue'>읽는다</span>."
      }
      else if(droppedArea.closest('.quiz_5')){
        droppedArea.innerHTML = "친구들과 함께 숨바꼭질을 <span class='blue'>한다</span>."
      }
      droppedArea.classList.add('correctStep_1');
      correctStep_2();
    }, 1000);
  }
  function correctStep_2() {
    setTimeout(function () {
      droppedArea.innerHTML = "";
      droppedArea.classList.add('correctStep_2');
      droppedArea.classList.add('correctStep_3');
      correctStep_3();
    }, 3000);
  }
  function correctStep_3() {
    setTimeout(function () {
      roketSound();
      droppedArea.classList.add('fly');
      correctStep_4();
    }, 850);
  }

  function correctStep_4() {
    let lastPage = quizPages[quizPages.length -1]
    let lastPageCom = lastPage.classList.contains('complete') 
    setTimeout(function () {
      if(lastPageCom) {
        goodJopPopup();
      }else {
        popup_container.classList.add('dim');
        nextBtn.classList.add('on');
    document.querySelector('main').classList.remove('pointerNon')

      }
    }, 2500);
    return;
  }
}



function completeClass() {
  console.log('정답 페이지에 complete 클래스를 붙임');
  let dragdrop_wrap = document.querySelector('[data-quiz="dragDrop"].on');
  dragdrop_wrap.classList.add('complete');

}

// Add event listener for mousedown event to start dragging
document.querySelectorAll(".draggable").forEach(function (e) {
  e.addEventListener('mousedown', startDrag);
})



