var curr_page;
var result=[];


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
  

  var buttons = $(".button");
  var temp=[];
  var i =0;
  if (curr_page==2){i=4;}
  else if(curr_page ==3) {i=9}

  for(i; i<buttons.length; i++){
    //for chosen buttonsm add their text to the reuslt array
    if(buttons[i].style.backgroundColor=="rgb(94, 131, 186)"){
      //for the "other" button, add the user input into the array
      if(buttons[i].innerHTML=="Other"){
        var text=document.getElementById("myPhone").value;
        temp.push(text);
      }else{
      temp.push(buttons[i].innerHTML)}
    }
  }
  result.push(temp);
  
  if(curr_page==3){
    var r1=result[0].join(', '); //reuslt of the first quetsion 
    var r2=result[1].toString();  //reuslt of the second quetsion 
    var r3=result[2].join(', ');  //reuslt of the third quetsion 
    document.getElementById("analysis").innerHTML="Iphone XS has better "+r1+", which are all the things that you care about in your phone. Also, your current phone "
    +r2 +" does a worse job supporting "+r3 +" than Iphone XS" ;
    
  }
  
  //if we're at the results page
  if(curr_page==4){
    curr_page=1;
    reuslt=[];
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
    result.pop();
  }
}

function expand(){ 
  var myphone=document.getElementById("myPhone");
  var otherButton=document.getElementById("other");
  var result="";
  if (myphone.style.display = "none"){
    myphone.style.display = "block";
    toggle(otherButton);
    
  }
  myphone.addEventListener("keyup", function(event){
    if(event.keyCode===13 && myphone.value!=""){
      event.preventDefault();
      myphone.style.display="none";
      
      result=myphone.value;
    }})
}






window.onload=setup;
