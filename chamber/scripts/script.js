// ---- Accessibility helper
function setAriaExpanded(el, val) { if (el) el.setAttribute('aria-expanded', val ? 'true' : 'false'); }

// ---- Elements
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const navLinksUL = document.getElementById('navLinks');
const darkToggle = document.getElementById('darkToggle');
const spotlightContainer = document.getElementById('spotlightContainer');
const lastMod = document.getElementById('lastMod');

// set last modified
if (lastMod) lastMod.textContent = document.lastModified || new Date().toLocaleDateString();

// ---- Mobile nav behavior (hamburger)
if (hamburger && mainNav && navLinksUL) {
  hamburger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open');
    setAriaExpanded(hamburger, open);
    if (window.innerWidth <= 768) {
      navLinksUL.style.display = open ? 'flex' : 'none';
    }
    document.body.style.overflow = (open && window.innerWidth <= 768) ? 'hidden' : '';
  });

  document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
      navLinksUL.style.display = '';
      setAriaExpanded(hamburger, false);
      document.body.style.overflow = '';
    }
  }));
}

// ---- Dark mode with persistence
function applyDark(on) {
  document.body.classList.toggle('dark', on);
  if (darkToggle) darkToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
  try { localStorage.setItem('lima-chamber-dark', on ? 'true' : 'false'); } catch (e) { }
}
try {
  const saved = localStorage.getItem('lima-chamber-dark') === 'true';
  applyDark(saved);
} catch (e) { }
if (darkToggle) {
  darkToggle.addEventListener('click', () => applyDark(!document.body.classList.contains('dark')));
}



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
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" loading="lazy" width="50" height="50">
          <div>
            <div class="temp">${tempF}°F</div>
            <div class="meta" style="text-transform:capitalize">${desc}</div>
            <div class="small muted">High: ${Math.round(tempMax * 9 / 5 + 32)}°F • Low: ${Math.round(tempMin * 9 / 5 + 32)}°F</div>
            <div class="small muted">Humidity: ${humidity}%</div>
            <div class="small muted">Sunrise: ${sunrise} • Sunset: ${sunset}</div>
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




// ---- reset nav on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const ul = document.querySelector('nav.main-nav .links');
    if (ul) ul.style.display = '';
    if (mainNav) mainNav.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    setAriaExpanded(hamburger, false);
    document.body.style.overflow = '';
  }
});


// ---- Spotlights new version (INDEX)

// scripts/spotlight.js  ← versión de emergencia que funciona al 1000%
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('spotlightContainer');
  
  try {
    // Cambia esta línea si tu JSON está en otra carpeta
    const res = await fetch('./data/members.json');  // ← aquí está el 90% de los problemas
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const members = await res.json();

    // Filtrar Gold y Silver
    const premium = members.filter(m => 
      m.membershipLevel === "Gold" || 
      m.membershipLevel === "Silver" ||
      m.membership === "Gold" || 
      m.membership === "Silver"
    );

    if (premium.length === 0) {
      container.innerHTML = '<p style="color:red; text-align:center;">No hay miembros Gold/Silver en el JSON</p>';
      return;
    }

    // Barajar y elegir 2 o 3
    const shuffled = premium.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 o 3

    container.innerHTML = ''; // limpiar

    selected.forEach(m => {
      const card = document.createElement('div');
      card.className = 'spot-card';
      card.innerHTML = `
        <img src="${m.image || m.logo || 'images/placeholder.webp'}" alt="${m.name}" loading="lazy">
        <h3>${m.name}</h3>
        <p>${m.address || 'Sin dirección'}</p>
        <p>${m.phone || 'Sin teléfono'}</p>
        <a href="${m.website || '#'}" target="_blank">Web</a>
        <span class="membership ${ (m.membershipLevel || m.membership || '').toLowerCase() }">
          ${m.membershipLevel || m.membership || 'Member'}
        </span>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:red; text-align:center;">
      Error cargando spotlights<br>${err.message}<br>
      Ruta probada: ./data/members.json
    </p>`;
  }
});
