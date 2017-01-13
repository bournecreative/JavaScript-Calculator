//Global variables
var firstNum = [];
var secNum = [];
var opPressed = false;
var operator = null;

//Click handles that stores values of what button was clicked
function keyPressValue(){
  $('button').click(function() {
    var value = $(this).text();
    var type = "";
    
    if ($(this).hasClass('numbers')) {
      type = 'number'
    } else if ($(this).hasClass('operators')){
      type = 'operator';
    } else if ($(this).hasClass('equals')){
      type = 'equal';
    }else if ($(this).hasClass('btn-clear')){
      type = 'clear';
    }
    //object that stores values of key press
    var btnValues = {
      value : value,
      type: type
    };
    //sends object to function to proceed with next step
    valueSorter(btnValues);
  })
}
//Determines the following, key press value
function valueSorter(obj) {
  if (obj.type === 'number' && !opPressed) {
   clearErrorScreen();
   buildNumOne(obj.value);
  }else if (obj.type === 'number' && opPressed && firstNum !==null){
    clearErrorScreen();
    buildNumTwo(obj.value);
  }else if (obj.type === 'operator'){
    clearErrorScreen();
    $('.numberDisplay').val(obj.value);
    opPressed = true;
    operator = obj.value;
  }else if (obj.type === 'equal'){
    calculate();
    opPressed = false;
  }else if (obj.type === 'clear'){
    clearInput(obj.value);
  }
}

//creates firstNum value from array
function buildNumOne(value){
  //checks if decimal already exists in firstNum array
  if (value === '.'){
    for (var i=0; i<firstNum.length; i++){
      if (firstNum[i] === '.'){
        return;
      }
    }
  }
    //push value to array
    firstNum.push(value);
    //stripe out commas
    firstNumTotal = firstNum.join("");
    //display first number
    $('.numberDisplay').val(firstNumTotal);
    // console.log(firstNumTotal);
}

//creates secNum value from array
function buildNumTwo(value){
  //checks if decimal already exists in secNum array
  if (value === '.'){
    for (var i=0; i<secNum.length; i++){
      if (secNum[i] === '.'){
        return;
      }
    }
  }
  //push value to array
  secNum.push(value);
  //stripe out commas
  secNumTotal = secNum.join("");
  //display second number
  $('.numberDisplay').val(secNumTotal);
  // console.log(secNumTotal);
}

//Coverts firstNum value to a decimal point number
function parseNumOne(){
  firstNumTotal = firstNum.join("");
  console.log(firstNumTotal);
  return parseFloat(firstNumTotal);
}

//Coverts secNum value to a decimal point number
function parseNumTwo(){
  secNumTotal = secNum.join("");
  console.log(secNumTotal);
  return parseFloat(secNumTotal);
}

//Resets global variables to start fresh
function numberReset(){
  firstNum = [];
  secNum = [];
  operator = null;
  opPressed = false;
}

//Functionality for clear buttons
function clearInput(clearType){
  //Clear values for firstNum and secNum
  if (clearType === 'CE'){
    numberReset();
    //clear error styles if any
    $('.numberDisplay').removeClass('error');
    $('.numberDisplay').val('');
  }else if (clearType === 'C'){
      //should operators pushed before numbers
    if (firstNum.length<=0 && operator !== null){
      numberReset();
      //clear error styles if any
      $('.numberDisplay').val('');
      //clears entries for firstNum
    }else if (firstNum.length>0 && operator === null) {
      firstNum = [];
      //clear error styles if any
      $('.numberDisplay').val('');
    }else if (secNum.length>0 && operator !== null) {
      secNum = [];
      //clear error styles if any
      $('.numberDisplay').val('');
    }else{
      //clear error styles if any
      $('.numberDisplay').removeClass('error');
      $('.numberDisplay').val('');
    }
  }
}

//clears the error screen when number, operator buttons are pressed
function clearErrorScreen(){
  $('.numberDisplay').removeClass('error');
}

//checks numbers being divided
function divisionCheck(num1, num2) {
  if (num2 === 0) {
    return true;
  }
}

//performs basic arithmetic operations
function calculate() {
  var num1 = parseNumOne();
  var num2 = parseNumTwo();
  var total;
  
  switch (operator) {
    case '+':
      total = num1 + num2;
      $('.numberDisplay').val(total);
      numberReset();
      firstNum.push(total);
      break;
    case '-':
      total = num1 - num2;
      $('.numberDisplay').val(total);
      numberReset();
      firstNum.push(total);
      break;
    case '*':
      total = num1 * num2;
      $('.numberDisplay').val(total);
      numberReset();
      firstNum.push(total);
      break;
    case '/':
      var error = divisionCheck(num1, num2);
      if (!error) {
        total = num1 / num2;
        $('.numberDisplay').val(total);
        numberReset();
        firstNum.push(total);
      } else {
        $('.numberDisplay').val("error").addClass('error');
        numberReset();
      }
      break;
  }
}

$(document).ready(function(){
  keyPressValue();
});
