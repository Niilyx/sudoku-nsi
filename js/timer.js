function Time() {
    // Creating object of the Date class
    var date = new Date();
    // Get current hour
    var hour = date.getHours();
    // Get current minute
    var minute = date.getMinutes();
    // Updating hour, minute, and second
    // if they are less than 10
    hour = update(hour);
    minute = update(minute);
    // Adding time elements to the div
    document.getElementById("clock").innerText = hour+" : "+minute;
    // Set Timer to 1 sec (1000 ms)
    setTimeout(Time, 1000);
  }
    // Function to update time elements if they are less than 10
    // Append 0 before time elements if they are less than 10
    function update(t) {
    if (t < 10) {
    return "0" + t;
    }
    else {
    return t;
    }
  }
  Time();