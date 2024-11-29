//Dark mode
const body = document.body;
    const navbar = document.getElementById("navbar");
    const footer = document.getElementById("footer");
    const toggleButton = document.getElementById("toggleButton");

    function setDarkMode() {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      navbar.classList.remove("custom-nav-light");
      navbar.classList.add("custom-nav-dark");
      footer.classList.remove("footer-light");
      footer.classList.add("footer-dark");
      toggleButton.innerText = "Light Mode";
    }

    function setLightMode() {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      navbar.classList.remove("custom-nav-dark");
      navbar.classList.add("custom-nav-light");
      footer.classList.remove("footer-dark");
      footer.classList.add("footer-light");
      toggleButton.innerText = "Dark Mode";
    }

    toggleButton.addEventListener("click", function () {
      if (body.classList.contains("light-mode")) {
        setDarkMode();
      } else {
        setLightMode();
      }
    });

    function applySystemTheme() {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDarkScheme) {
        setDarkMode();
      } else {
        setLightMode();
      }
    }

    applySystemTheme();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", applySystemTheme);
//Dark mode end
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
//Weather widget
! function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://weatherwidget.io/js/widget.min.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }(document, 'script', 'weatherwidget-io-js');
  //Weather widget end
