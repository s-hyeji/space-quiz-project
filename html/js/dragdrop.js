 // Get the draggable element
 var draggable;
 let dropArea = document.querySelector(".dropArea")
 // Variables to track mouse position and dragging state
 var offsetX, offsetY;
 var isDragging = false;
 let droppedArea;
 let scale;

   // 맨 처음 드래그 요소의 위치값을 저장해 둘 변수 
 let pureOffsetX ;
 let pureOffsetY ;
 


 // 드래그를 시작한다.
 function startDrag(e) {
  scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
   draggable = e.target;

  // 맨 처음 드래그 요소의 위치값을 저장해둔다.
  pureOffsetX = draggable.offsetLeft;
  pureOffsetY = draggable.offsetTop;
  // console.log(pureOffsetX+'왼쪽');
  // console.log(pureOffsetY+'위쪽');


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
 }
 function endCallback() {
   let copy = draggable.cloneNode(true);
   copy.style.position = 'static'
   dropArea.append(copy)
 }

 function checking() {
  // draggable는 드래그할 요소 / droppedArea 드롭영역
   let objans = draggable.getAttribute('drag-obj')
   let dropans = droppedArea.getAttribute('data-drop')

   console.log(objans+'...objans');
   console.log(dropans+'...dropans ');
   if (objans === dropans) {
     console.log("cor")
   } else if (objans ==! dropans) {

    // 드래그 영역에 드래그 되지 않앗을때와, 바깥배경에 드래그되었을때도 fail이 떠야함.
     console.log('fail')
        // dragdrop_fail(objans);
   }
 }

 function dragdrop_fail(fail_objans){
  let failHumen = document.querySelector(`.draggable[drag-obj="${fail_objans}"]`);
    failHumen.style.left=pureOffsetX.toString() + 'px';
    failHumen.style.top=pureOffsetY.toString() + 'px';
      
    // let pureOffsetX = draggable.offsetLeft;
    // let pureOffsetY 
 }

 // Add event listener for mousedown event to start dragging
 document.querySelectorAll(".draggable").forEach(function (e) {
   e.addEventListener('mousedown', startDrag);
 })