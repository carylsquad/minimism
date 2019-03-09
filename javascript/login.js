var login = true;

function init(){
  var fields = $('.login');
  for(var i =0; i<fields.length; i++){
    fields[i].addEventListener("keyup", function(event){
      if(event.keyCode===13){
        event.preventDefault();
        //simulate clicking the search button
        homePage();}});
  }
}


function homePage(){
  $('.warning').fadeOut(400);
  var inputs=$('input');
  if(emptyInput(inputs)){
    $('#empty-input').fadeIn(400);
    return}
  $('#page-container').fadeOut(400, function(){
    localStorage.setItem('username', inputs[0].value);
    window.location.href="home.html";});
}

function emptyInput(inputs){
  for(var i =0; i<inputs.length; i++){
    if(inputs[i].value==""){
      return true}}
  return false;
}

function signUpPage(){
  $('.warning').fadeOut(400);
  $('input').value="";
  $('#page-container').fadeOut(400, function(){
    window.location.href="signup.html";});
}


//run init function after window loads
window.onload=init;
