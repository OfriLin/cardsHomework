
//---- function - create new cards -----

function newCard(){
    //get wrapper element and information about the size 
    const wrapper = document.querySelector(".wrapper");
    const wrapperSize = wrapper.getBoundingClientRect();

    //create new div with "card" class
    const div = document.createElement('div');
    div.classList.add("card");
    
    //set a random position to the div (inside wrapper)
    const randomTop = Math.floor(Math.random() * wrapperSize.height) + wrapperSize.top;
    const randomLeft = Math.floor(Math.random() * wrapperSize.width) + wrapperSize.left;
    div.style.position = 'absolute';
    div.style.top = randomTop + 'px';
    div.style.left = randomLeft + 'px';
    
    //set a random backgroung color
    const randomColor = 'rgb(' +
    Math.floor(Math.random() * 56 + 180) + ',' +
    Math.floor(Math.random() * 56 + 180) + ',' +
    Math.floor(Math.random() * 56 + 180) +
    ')';
    div.style.backgroundColor = randomColor;

    //add div
    wrapper.appendChild(div);

    //add event listener - double click
    div.addEventListener('dblclick', replaceWithInput);
    //add event listener - mouse down
    div.addEventListener('mousedown', moveDiv);
}

//function - input new text when double click, and replace the input tag with text
function replaceWithInput(event){
    const divElement = event.target;
    //add input tag
    const inputElement = document.createElement('input');
    divElement.innerHTML = '';
    divElement.appendChild(inputElement);

    //add event - when focus stops, replace to input text
    inputElement.focus();
    inputElement.addEventListener("blur", (event) => {
        divElement.innerHTML = inputElement.value;
      });
}

//function - when mouse down move div, stop when mouse up
function moveDiv(event){
    const divElement = event.target;
    divElement.style.zIndex = getMaxZIndex() + 1;
    const initialX = event.clientX - divElement.offsetLeft; //clientX = horizontal coordinate of mouse, offsetLeft = number of pixels that the upper left corner of 
    const initialY = event.clientY - divElement.offsetTop;

    //function - update the posion when mouse move
    function handleMouseMove(moveEvent) {
        const newLeft = moveEvent.clientX - initialX;
        const newTop = moveEvent.clientY - initialY;
        divElement.style.left = `${newLeft}px`;
        divElement.style.top = `${newTop}px`;
      }

      document.addEventListener('mousemove', handleMouseMove);

      //function - remove event listener when mouse up
      function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }

      document.addEventListener('mouseup', handleMouseUp);
}

//function - get max z-index
function getMaxZIndex() {
    const allDivs = document.getElementsByClassName('card');
    let maxZIndex = 0;
    for (let i = 0; i < allDivs.length; i++) {
      const zIndex = parseInt(window.getComputedStyle(allDivs[i]).getPropertyValue('z-index'));
      if (zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    }
    return maxZIndex;
  }