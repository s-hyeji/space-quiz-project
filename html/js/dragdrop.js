 // Get the draggable element
 var draggable;
 let dropArea = document.querySelector(".dropArea")
 // Variables to track mouse position and dragging state
 var offsetX, offsetY;
 var isDragging = false;
 let droppedArea;
 let scale;

 // 드래그를 시작한다.
 function startDrag(e) {
  scale = document.querySelector("#wrap").style.transform.split('scale(')[1].split(')')[0]
   draggable = e.target;
   // Calculate the offset between mouse position and top-left corner of the draggable element
   offsetX = (e.clientX / scale) - draggable.offsetLeft + (draggable.style.width / 2);
   offsetY = (e.clientY / scale) - draggable.offsetTop + (draggable.style.height / 2);



   console.log(scale+'sdkakdladladkmsmksl');
   // Set dragging state to true
   isDragging = true;

   // Add event listeners for mousemove and mouseup events
   document.addEventListener('mousemove', drag);
   document.addEventListener('mouseup', stopDrag);
 }

 // Function to handle dragging
 function drag(e) {
   console.log("확인", e);

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
   console.log(dropcheck)
 }
 function endCallback() {
   let copy = draggable.cloneNode(true);
   copy.style.position = 'static'
   dropArea.append(copy)
 }

 function checking() {
   let objans = draggable.getAttribute('drag-obj')
   let dropans = droppedArea.getAttribute('drop-obj')
   if (objans == dropans) {
     console.log("cor")
   } else {
     console.log('fail')
   }
 }

 // Add event listener for mousedown event to start dragging
 document.querySelectorAll(".draggable").forEach(function (e) {
   e.addEventListener('mousedown', startDrag);
 })