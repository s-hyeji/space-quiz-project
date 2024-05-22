// 혜지 드래그라인

var lineObj;
let lineArea = document.querySelectorAll(".dragLineArea");
var offsetX, offsetY;
var isDragging = false;
let droppedArea;
function startDrag(e) {
    let scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
    lineObj = e.target
    console.log("혜지 확인 >>>>>>", e);
    offsetX = (e.clientX / scale) - lineObj.offsetLeft + (lineObj.style.width / 2);
    offsetY = (e.clientY / scale) - lineObj.offsetTop + (lineObj.style.height / 2);

    isDragging = true;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    let scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
    if (isDragging) {
        var newX = (e.clientX / scale) - offsetX;
        var newY = (e.clientY / scale) - offsetY;

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
    let target = document.querySelectorAll(".dragLineArea")
    // 대상 오브젝트의 위치
    var targetRect = [];
    for (let i = 0; i < target.length; i++) {
        targetRect.push(target[i].getBoundingClientRect())
    }
    // let scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
    // 마우스의 위치
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    let dropcheck = false;
    // console.log(targetRect[0] )
    // 마우스가 대상 오브젝트 위에 있는지 확인하기!
    for (let i = 0; i < targetRect.length; i++) {
        if (mouseX >= targetRect[i].left && mouseX <= targetRect[i].right &&
            mouseY >= targetRect[i].top && mouseY <= targetRect[i].bottom) {
            dropcheck = true;
            droppedArea = target[i];
            checking();
        } else {

            // reset;
        }
    }
    console.log(dropcheck)
}
function checking() {
    let objans = lineObj.getAttribute('drag-Line-left')
    let dropans = droppedArea.getAttribute('drag-Line-right')
    if (objans === dropans) {
        console.log("cor")
    } else {
        console.log('fail')
    }
}


document.querySelectorAll(".dragLineObj").forEach(function (e) {
    e.addEventListener('mousedown', startDrag);
})