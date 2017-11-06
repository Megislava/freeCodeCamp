var defaultTime = 25;
var runningTime;
var run = false;
var running;

function clickHandler() {
  var value = $(this).attr("value");
  if (run.valueOf() == false) {
    if (value === "+" && defaultTime < 60) {
      defaultTime++;
    } else if (value === "-" && defaultTime > 1) {
      defaultTime--;
    }

    runningTime = defaultTime * 60;
    $("#defaultTime").html(defaultTime);
    $("#runningTime").html(
      Math.floor(runningTime / 60) + ":" + runningTime % 60
    );
  }
}

function tick() {
  if (runningTime > 0) {
    runningTime--;
    $("#runningTime").html(
      Math.floor(runningTime / 60) + ":" + runningTime % 60
    );
  } else {
    reset();
  }
}

function reset(){
  clearInterval(running);
  run = false;
  
}

$(document).ready(function() {
  $("button").click(clickHandler);
  $("#defaultTime").html(defaultTime);

  runningTime = defaultTime * 60;

  $("#runningTime").html(Math.floor(runningTime / 60) + ":" + runningTime % 60);
  //mít boolean proměnnou která by držela jestli už už se jednou běží nebo ne a pokud ano tak už nic nedělat
  console.log(run.valueOf());
  $("#start").click(function() {
    if (run.valueOf() == false) {
      run = true;
      running = setInterval(tick, 1000);
    }
  });
  $("#stop").click(reset);
});