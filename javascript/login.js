var login = true;

function init(){
  $('.warning').hide();
  $('#container').fadeIn(400);}

function homePage(){

  let email = document.getElementById('login-email').value
  localStorage.setItem('email', email);
  console.log(email);

  $('.warning').hide();
  var inputs=$('input');
  if(emptyInput(inputs)){
    $('#empty-input').show();
    return}
  $('#container').fadeOut(400, function(){
    window.location.href="home.html";});
}

function emptyInput(inputs){
  for(var i =0; i<inputs.length; i++){
    if(inputs[i].value==""){
      return true}}
  return false;
}

function signUpPage(){
  $('.warning').hide();
  $('input').value="";
  $('#container').fadeOut(400, function(){
  window.location.href="signup.html";});
}


//run init function after window loads
window.onload=init;
