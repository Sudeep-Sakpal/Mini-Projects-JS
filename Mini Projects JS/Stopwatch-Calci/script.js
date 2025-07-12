// Stopwatch variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var timer;
var isRunning = false;

// Stopwatch functions
function startStopwatch() {
  if (isRunning == false) {
    timer = setInterval(updateTime, 1000);
    isRunning = true;
    document.getElementById("startBtn").innerHTML = "Resume";
  }
}

function stopStopwatch() {
  clearInterval(timer);
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("timeDisplay").innerHTML = "00:00:00";
  document.getElementById("startBtn").innerHTML = "Start";
}

function updateTime() {
  seconds = seconds + 1;

  if (seconds >= 60) {
    seconds = 0;
    minutes = minutes + 1;
  }

  if (minutes >= 60) {
    minutes = 0;
    hours = hours + 1;
  }

  var h = hours;
  var m = minutes;
  var s = seconds;

  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;

  document.getElementById("timeDisplay").innerHTML = h + ":" + m + ":" + s;
}

// Calculator variables
var currentNumber = "";
var previousNumber = "";
var operator = "";

// Calculator functions
function appendToDisplay(value) {
  var display = document.getElementById("calcDisplay");
  if (display.value == "0" && value != ".") {
    display.value = value;
  } else {
    display.value = display.value + value;
  }
}

function clearDisplay() {
  document.getElementById("calcDisplay").value = "";
  currentNumber = "";
  previousNumber = "";
  operator = "";
}

function deleteLast() {
  var display = document.getElementById("calcDisplay");
  var currentValue = display.value;
  display.value = currentValue.substring(0, currentValue.length - 1);
}

function calculate() {
  var display = document.getElementById("calcDisplay");
  var expression = display.value;

  // Replace × with * for calculation
  expression = expression.replace(/×/g, "*");

  try {
    var result = eval(expression);
    display.value = result;
  } catch (error) {
    display.value = "Error";
    setTimeout(function () {
      display.value = "";
    }, 2000);
  }
}

// Add event listeners when page loads
window.onload = function () {
  document.getElementById("startBtn").onclick = startStopwatch;
  document.getElementById("stopBtn").onclick = stopStopwatch;
  document.getElementById("resetBtn").onclick = resetStopwatch;
};
