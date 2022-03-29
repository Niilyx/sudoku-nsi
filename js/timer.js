function Time() {

  var date = new Date();

  var hour = date.getHours();

  var minute = date.getMinutes();

  hour = update(hour);
  minute = update(minute);

  document.getElementById("clock").innerText = hour + " : " + minute;

  setTimeout(Time, 1000);
}

function update(t) {
  if (t < 10) {
    return "0" + t;
  }
  else {
    return t;
  }
}

Time();