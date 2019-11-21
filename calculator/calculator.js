"use strict";
//declaring the values and the elements
var inputField = document.getElementById('express');
var numList = [0,1,2,3,4,5,6,7,8,9];
var btnList = [];
var ce = document.getElementById("AC");
btnList[0] = document.getElementById('zero');
btnList[1] = document.getElementById('one');
btnList[2] = document.getElementById('two');
btnList[3] = document.getElementById('three');
btnList[4] = document.getElementById('four');
btnList[5] = document.getElementById('five');
btnList[6] = document.getElementById('six');
btnList[7] = document.getElementById('seven');
btnList[8] = document.getElementById('ate');
btnList[9] = document.getElementById('nine');
btnList[10] = document.getElementById('point');
btnList[11] = document.getElementById('plus');
btnList[12] = document.getElementById('sub');
btnList[13] = document.getElementById('times');
btnList[14] = document.getElementById('divide');
btnList[15] = document.getElementById('equals');

//Calculates an equation the user 
function calculate(inputField){
    var results = eval(inputField.value);
    inputField.value = results;
}

//writes numbers onto the field when the user presses a button
btnList[0].addEventListener("click", function(){
    inputField.value += 0;
});
btnList[1].addEventListener("click", function(){
    inputField.value += 1;
});
btnList[2].addEventListener("click", function(){
    inputField.value += 2;
});
btnList[3].addEventListener("click", function(){
    inputField.value += 3;
});
btnList[4].addEventListener("click", function(){
    inputField.value += 4;
});
btnList[5].addEventListener("click", function(){
    inputField.value += 5;
});
btnList[6].addEventListener("click", function(){
    inputField.value += 6;
});
btnList[7].addEventListener("click", function(){
    inputField.value += 7;
});
btnList[8].addEventListener("click", function(){
    inputField.value += 8;
});
btnList[9].addEventListener("click", function(){
    inputField.value += 9;
});
btnList[10].addEventListener("click", function(){
    inputField.value += ".";
});
btnList[11].addEventListener("click", function(){
    inputField.value += "+";
});
btnList[12].addEventListener("click", function(){
    inputField.value += "-";
});
btnList[13].addEventListener("click", function(){
    inputField.value += "*";
});
btnList[14].addEventListener("click", function(){
    inputField.value += "/";
});
//clears the field without needing to refresh the entire page
ce.addEventListener("click", function(){
    inputField.value = null;
});
//Performs the calculation
btnList[15].addEventListener("click", function(){
    calculate(inputField);
});