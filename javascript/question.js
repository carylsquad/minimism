// Question Class allows us to more easily change the question
class Question {
  constructor(prompt, answers, responsePrompt) {
    this.prompt = prompt
    this.answers = answers
    this.responsePrompt = responsePrompt
  }
}

var currentPage;
var answers = [];
var QuestionQueue = [];
var History = [];

// Questions
var iPhoneFirstQuestion = new Question("Fantastic! iPhone XS is great. What characteristics do you give a shit about? Don't be stupid and check all that apply.", ["OS", "Size", "CPU", "Camera"], "I care...   ⏎");
var iPhoneSecondQuestion = new Question("What piece of garbage do you currently use?", ["iPhone X", "Galaxy S9", "Pixel 3/XL", "OnePlus 6T"], "My phone is...   ⏎");
var iPhoneThirdQuestion = new Question("What do you waste your time on when using your phone?", ["Social Media", "Video Streaming", "Messaging", "Games"], "I use...   ⏎");

var foodFirstQuestion = new Question("Okay, that might taste good. Why are you even interested in Pocky? Don't be lazy and check all that apply.", ["Flavor", "Nutrition", "Allergies", "Portability"], "I like...   ⏎");
var foodSecondQuestion = new Question("In all seriousness, how do you feel about the price?", ["Bad", "Okay", "Good", "Indifferent"], "It's...   ⏎");
var foodThirdQuestion = new Question("When was the last time you wasted your money on some Pocky?", ["This week", "This month", "This year", "Never"], "It was...   ⏎");

var jeansFirstQuestion = new Question("What characteristics do you care about?", ["Price", "Cut", "Color", "Brand"], "I care...   ⏎");
var jeansSecondQuestion = new Question("How many of these things do you already own?", ["0", "1-5", "5-20", "My Last Name is Gates"], "I own...   ⏎");
var jeansThirdQuestion = new Question("For what purpose do you wish to purchase a brand new pair of trousers of the denim or dungaree cloth variety?", ["Slothing around", "Sleeping", "Lakefill walks", "Looking like a boss"], "I want to use them for...   ⏎");

var lawnFirstQuestion = new Question("How many hours does it take for you to mow the lawn? Knowing you, I'm guessing a lifetime and a year.", ["1-2", "3", "4-5", "6+"], "It takes...   ⏎")
var lawnSecondQuestion = new Question("I doubt that you even mow your lawn, but it's my job to ask the questions here. Riddle me this: how frequently do you mow the lawn?", ["Once a Week", "Once Every 2 Weeks", "Once A Month", "I Barely Ever Mow It"], "I mow every...   ⏎")
var lawnThirdQuestion = new Question("Don't know why you'd enjoy mowing the lawn, but tell me how much you like that.", ["I Live For It", "I Look Forward to It", "I Don't Mind It", "I Hate It"], "I feel...   ⏎")

// Initial Setup:
// Set Button Colors and Show First Question
function setup(){
  // Set initial button color to light
  for (var button of $(".button")) {
    setLight(button)
  }


  // Start the Queue, set the first question, and make things visible
  startQueue();
  currentPage = QuestionQueue.shift();
  setQuestion(currentPage);
  $(".container").show()
}

// Initialize the Question Queue based on default
function startQueue() {
  userInput = sessionStorage.getItem("userInput");
  if (userInput == "iphone xs") {
    defaultQuestions = [iPhoneFirstQuestion, iPhoneSecondQuestion, iPhoneThirdQuestion];
  }
  else if (userInput == "pocky") {
    defaultQuestions = [foodFirstQuestion, foodSecondQuestion, foodThirdQuestion];
  }
  else if (userInput == "jeans") {
    defaultQuestions = [jeansFirstQuestion, jeansSecondQuestion, jeansThirdQuestion];
  }
  else if (userInput == "lawn mowing service") {
    defaultQuestions = [lawnFirstQuestion, lawnSecondQuestion, lawnThirdQuestion];
  }

  for (var i = 0; i < defaultQuestions.length; i++) {
    QuestionQueue.push(defaultQuestions[i]);
  }
}

// Set the elements on the page to the current question.
function setQuestion(question) {
  $("#content").fadeOut(400, function() {
    document.getElementById("question").innerHTML = question.prompt;

    // Update Buttons
    var buttons = $(".button")
    for (var i = 0; i<buttons.length - 1; i++) {
      buttons[i].innerHTML = question.answers[i];
      setLight(buttons[i]);
    }

    // Display "Other" Prompt if Applicable
    if (question.responsePrompt == "None") {
      $("#other").hide();
      $("#response").hide();
    }
    else {
      $("#other").show();
      $("#response").hide();

      other = document.getElementById("other")
      other.innerHTML = "Other";
      setLight(other);

      response = document.getElementById("response")
      response.placeholder = question.responsePrompt;
      response.value = ""
    }

    currentPageNumber = History.length + 1
    totalPageCount = QuestionQueue.length + History.length + 1
    document.getElementById("page").innerHTML = "Question " + currentPageNumber.toString() + " of " + totalPageCount.toString()

    if (QuestionQueue.length == 0) {
      document.getElementById("next").innerHTML = "Submit"
    } else {
      document.getElementById("next").innerHTML = "<i class='fa fa-arrow-right'></i>"
    }

    $("#content").fadeIn(400);
  });


}

// Force buttons to Light (unselected) value
function setLight(button) {
  button.style.background="rgb(194, 210, 233)";
  button.style.color="rgb(58, 78, 122)";
  button.style.borderWidth="0px";
  button.style.padding="15px";
}

// Force buttons to Dark (selected) value
function setDark(button) {
  button.style.background="rgb(94, 131, 186)";
  button.style.color="rgb(194, 210, 233)";
}

// Toggle buttons color
function toggle(button){
  var color = button.style.backgroundColor;
  //when the button is dark, make it light
  if(color=="rgb(94, 131, 186)"){
    button.style.background="rgb(194, 210, 233)";
    button.style.color="rgb(58, 78, 122)";
  }
  //when the button is light, make it dark
  else if(color=="rgb(194, 210, 233)"){
    button.style.background="rgb(94, 131, 186)";
    button.style.color="rgb(194, 210, 233)";
  }
}

// When clicking next page button, save inputs and load next set of results
function next(){
  var buttons = $(".button");
  var selected = [];

  // Store Question Responses
  for(var i = 0; i<buttons.length; i++){
    //for chosen buttons add their text to the result array
    if(buttons[i].style.backgroundColor=="rgb(94, 131, 186)"){
      //for the "other" button, add the user input into the array
      if(buttons[i].innerHTML=="Other"){
        selected.push($("response").value);
      } else {
        selected.push(buttons[i].innerHTML)
      }
    }
  }

  if(selected.length==0){
    $("#nothingSelected").show();
    return
  }

  $("#nothingSelected").hide();
  answers.push(selected);

  // If we have answered all of the questions, we are done
  if (QuestionQueue.length == 0) {
    $("#content").fadeOut(400);
    sessionStorage.setItem("answers", answers);
    window.location.href="result.html";
  }

  // Save old page to the history, and load next page
  History.push(currentPage);
  currentPage = QuestionQueue.shift();
  setQuestion(currentPage);
}

function back(){
  // If we go back, clear the answers as they have been undone
  answers.pop()

  // If we're out of questions, exit out
  if (History.length == 0) {
    $("#content").fadeOut(400);
    window.location.href="home.html";
  }

  // Put the Question back in the front of the Queue, and load the previous
  QuestionQueue.unshift(currentPage);
  currentPage = History.pop();
  setQuestion(currentPage);
}

// Show Dialog Prompt
function expand(){
  var response = document.getElementById("response");

  $("#other").hide();
  $("#response").show();

  response.focus();

  function toggleResponse() {
    if (response.value != "") {
      other.innerHTML = response.value;
      setDark(other);
    }
    else {
      other.innerHTML = "Other";
      setLight(other);
    }

    $("#response").hide();
    $("#other").show();
  }

  response.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      toggleResponse()
    }
  });

  response.onblur = function() {
    toggleResponse();
  }
}

window.onload=setup;
