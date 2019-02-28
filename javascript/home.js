function init(){
  var input = document.getElementById("input");

  //when one lets go of a key
  input.addEventListener("keyup", function(event){
    //and that key is the enter + there is a search term
    if(event.keyCode===13 && input.value!=""){
      event.preventDefault();
      //simulate clicking the search button
      $("#button").click();}})
}


function search(){
  //if there is no value, don't search anything
  if($("#input").val()=="") {
    return;
  }
  //if there is a value, get the page that corresponds to it
  else {
    var query = $("#input").val().toLowerCase();
    if (query == "iphone xs" || query == "pocky") {
      sessionStorage.setItem("userInput", query);
      window.location.href="question.html";
    }
  }
}

//run init function after window loads
window.onload=init;
