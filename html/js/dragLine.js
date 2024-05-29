// 혜지 드래그라인

var lineObj;
let lineArea = document.querySelectorAll(".dragLineArea");
var offsetX, offsetY;
var isDragging = false;
let droppedArea;

let pureOffsetX;
let pureOffsetY;

let dropcheck = false;
let answerCheck = false;

var canvas
var context
var isDrawing = false;
var startX, startY;
var lines = [];
var startmouseX
var startmouseY
let objWidth;
let objHeight;
let mouseEndX
let mouseEndY

let checkObj
let checkArea

// dragLine

function startDrag(e) {
    let scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
    console.log(e)
    lineObj = e.target;
    lineObj.classList.add("isDragging")

    canvas = document.querySelector('.container > li.on canvas');
    context = canvas.getContext('2d');

    pureOffsetX = lineObj.offsetLeft;
    pureOffsetY = lineObj.offsetTop;

    objWidth = e.target.getBoundingClientRect().width / 2
    objHeight = e.target.getBoundingClientRect().height / 2

    // console.log(e.target.getBoundingClientRect.width)
    offsetX = (e.clientX / scale) - lineObj.offsetLeft + (lineObj.style.width / 2);
    offsetY = (e.clientY / scale) - lineObj.offsetTop + (lineObj.style.height / 2);
    startmouseX = (event.clientX / scale) - e.offsetX + objWidth;
    startmouseY = (event.clientY / scale) - e.offsetY + objHeight;
    // console.log("확인 >>>>>>>>>>>>>>>", canvas.offsetLeft);
    isDragging = true;
    isDrawing = true;
    startX = startmouseX - (canvas.getBoundingClientRect().left / scale)
    startY = startmouseY - (canvas.getBoundingClientRect().top / scale)
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}


function drag(e) {
    let scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
    if (isDragging) {
        var newX = (e.clientX / scale) - offsetX;
        var newY = (e.clientY / scale) - offsetY;
        let newmouseX = (event.clientX / scale) - (canvas.getBoundingClientRect().left / scale)
        let newmouseY = (event.clientY / scale) - (canvas.getBoundingClientRect().top / scale)
        lineObj.style.left = newX + 'px';
        lineObj.style.top = newY + 'px';
        if (isDrawing) {
            redrawCanvas();
            drawLine(startX, startY, newmouseX, newmouseY);
        }
    }

}

function stopDrag(e) {
    lineObj.classList.remove("isDragging")

    checkAnswer(e);

    if (isDrawing && answerCheck) {

    } else {
    }
    isDragging = false;
    isDrawing = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);

}
function checkAnswer(e) {
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
    dropcheck = false;


    // console.log(targetRect[0] )
    // 마우스가 대상 오브젝트 위에 있는지 확인하기!
    for (let i = 0; i < targetRect.length; i++) {
        if (mouseX >= targetRect[i].left && mouseX <= targetRect[i].right &&
            mouseY >= targetRect[i].top && mouseY <= targetRect[i].bottom) {
            dropcheck = true;
            droppedArea = target[i];
            checking();
        }
        // console.log("?????????????", e.target)
    }
    if (dropcheck === false) {
        // area에 위치하지 않았음.
        redrawCanvas();
        e.target.style.top = pureOffsetY + 'px'
        e.target.style.left = pureOffsetX + 'px'
    }

}
function checking(e) {
    let scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
    let objans = lineObj.getAttribute('drag-Line-left') || lineObj.getAttribute('drag-Line-right');
    let dropans = droppedArea.getAttribute('drag-Line-right') || droppedArea.getAttribute('drag-Line-left');

    console.log("Tlqkf", dropcheck);

    if (objans == dropans) {
        redrawCanvas();
        mouseEndX = (droppedArea.getBoundingClientRect().left / scale) - (canvas.getBoundingClientRect().left / scale) + droppedArea.getBoundingClientRect().width / 2
        mouseEndY = (droppedArea.getBoundingClientRect().top / scale) - (canvas.getBoundingClientRect().top / scale) + droppedArea.getBoundingClientRect().height / 2
        drawLine(startX, startY, mouseEndX, mouseEndY);

        console.log("cor")
        answerCheck = true;
        lines.push({ startX: startX, startY: startY, endX: mouseEndX, endY: mouseEndY });

        checkObj = document.querySelectorAll(`[drag-Line-left="${objans}"], [drag-Line-right="${objans}"]`);
        checkObj.forEach(e => e.classList.add("complete"))
    }
    else {
        console.log('fail')
        redrawCanvas();
        lineObj.style.top = pureOffsetY + 'px'
        lineObj.style.left = pureOffsetX + 'px'
    }
    console.log(lines)
    startmouseY = "";
    startmouseX = "";
    objWidth = "";
    objHeight = "";
    mouseEndX = "";
    mouseEndY = "";

}

function redrawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();
}
// Function to draw all lines
function drawLines() {
    lines.forEach(function (line) {
        drawLine(line.startX, line.startY, line.endX, line.endY);
    });
}

// Function to draw a line
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.scale = (document.querySelector("#wrap").style.transform.split("scale(")[1].split(")")[0], document.querySelector("#wrap").style.transform.split("scale(")[1].split(")")[0])
    context.strokeStyle = '#ffffff'; // Set line color
    context.lineWidth = 3; // Set line width
    context.stroke();
    context.closePath();

}

document.querySelectorAll(".dragLineObj").forEach(function (e) {
    e.addEventListener('mousedown', startDrag);
})




