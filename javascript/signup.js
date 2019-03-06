var login = true;

function init(){
  $('.warning').hide();
  $('#container').fadeIn(400);
}

function homePage(){
  $('.warning').hide();
  var inputs=$('input');
  if(emptyInput(inputs)){
    $('#empty-input').show();
    return}
  var firstPassword=inputs[1].value;
  var secondPassword=inputs[2].value;
  if(firstPassword!==secondPassword){
    $('#matching-passwords').show();
    return
  }
  $('#container').fadeOut(400, function(){
    window.location.href="home.html";});
}

function emptyInput(inputs){
  for(var i =0; i<inputs.length; i++){
    if(inputs[i].value==""){
      return true}}
  return false;
}

function logInPage(){
  $('.warning').hide();
  $('input').value="";
  $('#container').fadeOut(400, function(){
  window.location.href="login.html";});
}


//run init function after window loads
window.onload=init;
