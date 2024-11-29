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
//API
const apiKey = '6f30e7f02a4848ce45595fe25332b2d2';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const baymaxId = '177572';
const grootIds = ['1010818', '1010821', '1010819', '1010820', '1010823'];

async function fetchBaymaxDetails() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${baymaxId}?api_key=${apiKey}&language=en-US`);
        const movie = await response.json();
        displayMovieDetails(movie, 'movieDetails');
    } catch (error) {
        console.error('Error fetching Baymax details:', error);
        const movieDetailsDiv = document.getElementById('movieDetails');
        movieDetailsDiv.innerHTML = `<p class="text-danger">Error fetching Baymax details. Please try again later.</p>`;
    }
}

async function fetchGrootSeriesDetails() {
    try {
        const grootDetailsDiv = document.getElementById('grootSeries');
        grootDetailsDiv.innerHTML = '';
        for (const id of grootIds) {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
            const movie = await response.json();
            displayMovieDetails(movie, 'grootSeries', true);
        }
    } catch (error) {
        console.error('Error fetching Groot series details:', error);
        const grootDetailsDiv = document.getElementById('grootSeries');
        grootDetailsDiv.innerHTML = `<p class="text-danger">Error fetching Groot series details. Please try again later.</p>`;
    }
}

function displayMovieDetails(movie, containerId, append = false) {
    const container = document.getElementById(containerId);
    const movieContent = `
        <div class="movie-card">
            <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title} Poster" class="movie-poster">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Rating:</strong> ${movie.vote_average}</p>
        </div>
    `;
    if (append) {
        container.innerHTML += movieContent;
    } else {
        container.innerHTML = movieContent;
    }
}
fetchBaymaxDetails();
fetchGrootSeriesDetails();
//API end