
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

// ------------------------------------------------------
// ---------------------- EXPERIENCE PAGE --------------------
// ------------------------------------------------------



// ----------------------------- otra locuras

// Función autoejecutable asíncrona
(async () => {
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const container = document.getElementById('experiencias');

  try {
    // 1. Fetch API + async/await
    const response = await fetch('data/experiences.json');

    // 2. Verificamos si la respuesta es correcta
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // 3. Parseamos el JSON
    const experiences = await response.json();

    // Quitamos el mensaje de carga
    loadingEl.style.display = 'none';

    // 4. Recorremos y creamos el HTML dinámicamente
    experiences.forEach((exp, index) => {
      const tagsHTML = exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

      const cardHTML = `
    <div class="card" style="transition-delay: ${index * 150}ms">
      <div class="dates">${exp.dates}</div>
      <div class="content">
        <h3 class="title">${exp.title}</h3>
        <p class="desc">${exp.description}</p>
        <div class="tags">${tagsHTML}</div>
      </div>
    </div>
  `;

      container.insertAdjacentHTML('beforeend', cardHTML);
    });

  } catch (err) {
    // 5. Manejo robusto de errores (try...catch)
    loadingEl.style.display = 'none';
    errorEl.style.display = 'block';
    errorEl.textContent = `No se pudo cargar la experiencia: ${err.message}. Verifica que el archivo experiencia.json esté en la misma carpeta.`;
    console.error('Error al cargar el JSON:', err);
  }
})();

// ------------------------------------------------------
// ---------------------- PROJECTS PAGE --------------------
// ------------------------------------------------------
import { projects } from "../data/projects.mjs"
console.log(projects)

const showhere = document.getElementById("my-projects")

function displayItems(projects) {
  projects.forEach(x => {

    // build the card element
    const thecard = document.createElement("div")

    // build the photo element
    const thephoto = document.createElement("img")
    thephoto.src = `images/${x.photo_link}`
    thephoto.alt = x.name
    thecard.appendChild(thephoto)

    // build the title element
    const thetitle = document.createElement("h2")
    thetitle.innerText = x.name
    thecard.appendChild(thetitle)

    // build the address element
    const theaddress = document.createElement("address")
    theaddress.innerText = x.address
    thecard.appendChild(theaddress)

    // build the description element
    const thedesc = document.createElement("p")
    thedesc.innerText = x.description
    thecard.appendChild(thedesc)


    showhere.appendChild(thecard)
  })
}

// ------------------------------------------------------
// ---------------------- CONTACT PAGE --------------------
// ------------------------------------------------------
