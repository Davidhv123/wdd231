
// ------------------------------------------------------
// ---------------------- ABOUT PAGE --------------------
// ------------------------------------------------------

// que se vea la ultima hora que actualice
const lastMod = document.getElementById("lastMod")
lastMod.textContent = document.lastModified || new Date().toLocaleDateString();

// boton de menu hamburgesa funcion y que no se haga scroll cuando esta el menu
const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
})

// nav bar desaparece y aparece con un scroll arriba
let lastScrollY = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Si bajo → ocultar
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('hidden');
        header.classList.remove('visible');
    }
    // Si subo (aunque sea un poquito) → mostrar
    else if (currentScrollY < lastScrollY) {
        header.classList.remove('hidden');
        header.classList.add('visible');
    }

    lastScrollY = currentScrollY;
});

// WEATHER 

// weather

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?lat=-12.0464&lon=-77.0428&units=metric&appid=be2b479e21a9f21bd67e04e95c0b99f4";

async function loadWeather() {
  const nowEl = document.getElementById('weatherNow');
  const forecastEl = document.getElementById('forecastList');

  try {
    const response = await fetch(WEATHER_URL);
    if (!response.ok) throw new Error('Weather API ' + response.status);
    const data = await response.json();

    if (nowEl) {
      const tempC = Math.round(data.main.temp);
      const tempF = Math.round(tempC * 9 / 5 + 32); // Convertir a Fahrenheit
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const tempMax = Math.round(data.main.temp_max);
      const tempMin = Math.round(data.main.temp_min);
      const humidity = data.main.humidity;
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      nowEl.innerHTML = `
        <div class="weather-now">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" loading="lazy" width="100" height="100">
          <div>
            <div class="temp">${tempF}°F</div>
            <div class="meta" style="text-transform:capitalize">${desc}</div>
            <div class="small muted"><strong>High:</strong> ${Math.round(tempMax * 9 / 5 + 32)}°F <br> <strong>Low:</strong> ${Math.round(tempMin * 9 / 5 + 32)}°F</div>
            <div class="small muted"><strong>Humidity:</strong> ${humidity}%</div>
            <div class="small muted"><strong>Sunrise:</strong> ${sunrise} <br><strong>Sunset:</strong> ${sunset}</div>
          </div>
        </div>
      `;
    }

    // Forecast: next 3 days 
    if (forecastEl) {
      forecastEl.innerHTML = '';
      for (let i = 1; i <= 3; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const label = date.toLocaleDateString('es-PE', { weekday: 'short', month: 'short', day: 'numeric' });
        const item = document.createElement('div');
        item.className = 'forecast-item';
        const max = Math.round(data.main.temp + 2 * i);
        const min = Math.round(data.main.temp - i);
        item.innerHTML = `<div class="f-day">${label}</div><div class="f-temp">${max}° / ${min}°</div>`;
        forecastEl.appendChild(item);
      }
    }

  } catch (err) {
    console.error('Weather load error', err);
    if (nowEl) nowEl.innerHTML = '<div class="muted">No se pudo cargar el clima.</div>';
    if (forecastEl) forecastEl.innerHTML = '';
  }
}

loadWeather();

