//Weather Widget
! function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://weatherwidget.io/js/widget.min.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }(document, 'script', 'weatherwidget-io-js');
  //Weather Widget end
  //Digital Clock
  function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var period = "AM";
    if (hours >= 12) {
      period = "PM";
      if (hours > 12) hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    var timeString = hours + ":" + minutes + ":" + seconds + " " + period;

    var dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    document.getElementById("digital-clock").textContent = dateString + " " + timeString;
  }

  setInterval(updateClock, 1000);
  updateClock();
  //Digital Clock end
  //Dark Mode
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";
  if (isDarkMode) {
    body.classList.add("dark-mode");
    darkModeToggle.checked = true;
  }
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  });
  //Dark Mode end