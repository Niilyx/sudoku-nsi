var secs=0
var minutes=0
var promise;
function Time() {

    secs++
    
    if (secs >= 60) {
        secs = 0
        minutes++
    }
    if (minutes == 99 && secs == 60) {
        return
    }
    
    secs=update(secs)
    minutes=update(minutes)

    document.getElementById("clock").innerText = minutes + ":" + secs;

    secs = parseInt(secs)
    minutes = parseInt(minutes)

    if (!won) promise = setTimeout(Time, 1000);
}

function update(t) {
    if (t < 10) {
        return "0" + t;
    }
    else {
        return t;
    }
}