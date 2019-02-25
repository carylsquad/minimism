//dictionary where keys=search term and value=corresponding q+result pages
var firstQuestions = {"IPHONE XS": "phonePages.html"};

function init(){
  var input = document.getElementById("input");

  //when one let's go of a key
  input.addEventListener("keyup", function(event){
    //and that key is the enter + there is a search term
    if(event.keyCode===13 && input.value!=""){
      event.preventDefault();
      //simulate clicking the search button
      $("#button").click();}})
}


function search(){
  //if there is no value, don't search anything
  if($("#input").val()==""){return;}
  //if there is a value, get the page that corresponds to it
  else{window.location.href=firstQuestions[$("#input").val().toUpperCase()];}
}

//run init function after window loads
window.onload=init;
