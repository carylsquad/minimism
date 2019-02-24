function init(){
  var input = document.getElementById("input");
  var button = document.getElementById("button");

  input.addEventListener("keyup", function(event){
    if(event.keyCode===13 && input.value!=""){
      event.preventDefault();
      button.click();}})
}


function search(){
  if(document.getElementById("input").value==""){return;}
  else{window.location.href="question1.html";}
}

window.onload=init;
