function setup() {
  let buttons = document.getElementsByClassName('button')
  for (var i = 0; i < buttons.length; i++) {
    let buttonIndex = i
    buttons[buttonIndex].onmousedown = function() {
      buttonToggled(buttonIndex);
    }
  }
}

function buttonToggled(index) {
  console.log(index);

  selectionElementId = 'selection-' + index.toString()

  // console.log(selectionElementId);

  selectionElement = document.getElementById(selectionElementId)
  isSelected = selectionElement.className == "dot-selected"
  if (isSelected) {
    selectionElement.className = "dot"
  } else {
    selectionElement.className = "dot-selected"
  }
  console.log(isSelected);


}
