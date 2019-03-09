function init(){
  let info = document.getElementById('info')
  let username = localStorage.getItem('username')
  info.innerHTML = "Took you long enough, " + username + ". " + info.innerHTML;
  var input =  document.getElementById('input');
  //when one lets go of a key
  input.addEventListener("keyup", function(event){
    //and that key is the enter + there is a search term
    if(event.keyCode===13){
      event.preventDefault();
      //simulate clicking the search button
      $("#button").click();}});
  $('.show').fadeIn(400);
}


function search(){
  $('#error').fadeOut(400);
  //if there is no value, don't search anything
  if($("#input").val()=="") {
    document.getElementById('error').innerHTML="It's not rocket science. You need a term to search."
    $('#error').fadeIn(400);
    return;}
  //if there is a value, get the page that corresponds to it
  else {
    var query = $("#input").val().toLowerCase();
    if (query == "iphone xs" || query == "pocky" || query == "jeans") {
      sessionStorage.setItem("userInput", query);
      document.getElementById('info').style.marginBottom="80px"
      window.location.href="question.html";}
    else{
      errorMessage(query);}}
}

function errorMessage(query){
  var start_char=query.charAt(0)
  var error = document.getElementById('error');
  if(start_char=='p'){
    error.innerHTML="What the hell is "+query+"? Did you actually mean Pocky?"}
  else if(start_char=='i'){
    error.innerHTML="What the hell is "+query+"? Did you actually mean an iPhone XS?"}
  else if(start_char=="j"){
    error.innerHTML="What the hell is "+query+"? Did you actually mean jeans?"}
  else{error.innerHTML="Who taught you how to spell? Try again."}
  $('#error').fadeIn(400);
  document.getElementById('info').style.marginBottom="30px";

}

function logInPage(){
  $('body').fadeOut(400, function(){
    window.location.href="login.html";
  })
}

//run init function after window loads
window.onload=init;
