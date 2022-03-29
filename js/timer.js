function Time() {
    // Crée l'objet de classe Date
    var date = new Date();
    // Cherche l'heure actuelle
    var hour = date.getHours();
    // Cherche les minutes actuels
    var minute = date.getMinutes();
    // Met à jour le temps
    hour = update(hour);
    minute = update(minute);
    // Met en forme
    document.getElementById("clock").innerText = hour+" : "+minute;
    // Fréquence 1 seconde (1000ms)
    setTimeout(Time, 1000);
  }
    // Fonction update qui met à jour le temps
    function update(t) {
    if (t < 10) {
    return "0" + t;
    }
    else {
    return t;
    }
  }
  Time();