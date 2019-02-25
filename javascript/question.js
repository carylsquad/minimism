var curr_page;

function setup(){
  var buttons = $(".button");
  for(var i = 0; i<buttons.length; i++){
    //light by default
    buttons[i].style.backgroundColor="rgb(194, 210, 233)";
    buttons[i].style.borderColor="#f1f1f0";
    buttons[i].style.color="rgb(58, 78, 122)"
  }

  $("#p1").show();
  curr_page=1;
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

function next(){
  //if we're at the results page
  if(curr_page==4){
    curr_page=1;
    $("#p4").fadeOut(400, function(){
      //go back to the home page
      window.location.href="home.html";
    });
  }
  else{
    //hide the current page
    $("#p"+curr_page.toString()).fadeOut(400, function(){
      curr_page++;
      //and go to the next one
      $("#p"+curr_page.toString()).fadeIn(400)
    });

  }

}
function back(){
  //if we're at the first question
  if(curr_page==1){
    $("#p1").fadeOut(400, function(){
      //go bck to the home/search page
      window.location.href="home.html";
    });
  }
  //otherwise
  else{
    //go back to the previous page on the current track
    $("#p"+curr_page.toString()).fadeOut(400, function(){
      curr_page--;
      $("#p"+curr_page.toString()).fadeIn(400)
    });
  }
}

window.onload=setup;
