// 혜지 드래그라인
var lineObj;
let lineArea = document.querySelectorAll(".dragLineArea");
var offsetX, offsetY;
var isDragging = false;

function startDrag(e) {
    lineObj = e.target
    console.log("혜지 확인 >>>>>>", e);
    offsetX = e.clientX - lineObj.offsetLeft;
    offsetY = e.clientY - lineObj.offsetTop;

    isDragging = true;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (isDragging) {
        var newX = e.clientX - offsetX;
        var newY = e.clientY - offsetY;

        lineObj.style.left = newX + 'px';
        lineObj.style.top = newY + 'px';
    }
}

function stopDrag() {
    checkAnswer();

    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}
function checkAnswer() {
    // var lineObjRect = lineObj.getBoundingClientRect();
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
    for (let i = 0; i < targetRect.length; i++) {
        if (mouseX >= targetRect[i].left && mouseX <= targetRect[i].right &&
            mouseY >= targetRect[i].top && mouseY <= targetRect[i].bottom) {
            dropcheck = true;
            droppedArea = target[i];
            checking();
        } else {

            //reset;
        }
    }
    console.log(dropcheck)
}
function checking() {
    let objans = lineObj.getAttribute('drag-Line-left')
    let dropans = droppedArea.getAttribute('drag-Line-right')
    if (objans == dropans) {
        console.log("cor")
    } else {
        console.log('fail')
    }
}


document.querySelectorAll(".dragLineObj").forEach(function (e) {
    e.addEventListener('mousedown', startDrag);
})