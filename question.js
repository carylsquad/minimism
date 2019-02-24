function setup(){
  var buttons = document.getElementsByClassName("button");
  for(var i = 0; i<buttons.length; i++){
    //light by default
    buttons[i].style.backgroundColor="rgb(194, 210, 233)";
    buttons[i].style.borderColor="#f1f1f0";
    buttons[i].style.color="rgb(58, 78, 122)"
  }
}

function toggle(button){
  var color = button.style.backgroundColor;
  //when the button is dark, make it light
  if(color=="rgb(94, 131, 186)"){
    button.style.background="rgb(194, 210, 233)";
    button.style.color="rgb(58, 78, 122)";
    button.style.borderWidth="0px";
    button.style.padding="15px";
  }
  //when the button is light, make it dark
  else if(color=="rgb(194, 210, 233)"){
    button.style.background="rgb(94, 131, 186)";
    button.style.color="rgb(194, 210, 233)";
    button.style.borderWidth="3px";
    button.style.padding="12px";

  }
}
