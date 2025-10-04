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
function applyDark(on){
  document.body.classList.toggle('dark', on);
  if(darkToggle) darkToggle.setAttribute('aria-pressed', on ? 'true' : 'false');
  try { localStorage.setItem('lima-chamber-dark', on ? 'true' : 'false'); } catch(e){}
}
try {
  const saved = localStorage.getItem('lima-chamber-dark') === 'true';
  applyDark(saved);
} catch(e){}
if(darkToggle){
  darkToggle.addEventListener('click', ()=> applyDark(!document.body.classList.contains('dark')));
}

// ---- Companies
function loadCompanies() {
  const companies = [
    {
      "name": "Apple",
      "address": "One Apple Park Way, Cupertino, CA 95014, USA",
      "phone": "+1-800-692-7753",
      "website": "https://www.apple.com",
      "image": "apple-logo.png",
      "additional_info": "Specializes in consumer electronics and software."
    },
    {
      "name": "Google",
      "address": "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
      "phone": "+1-650-253-0000",
      "website": "https://www.google.com",
      "image": "google-logo.png",
      "additional_info": "Leader in internet-related services and products."
    },
    {
      "name": "Microsoft",
      "address": "One Microsoft Way, Redmond, WA 98052, USA",
      "phone": "+1-425-882-8080",
      "website": "https://www.microsoft.com",
      "image": "microsoft-logo.png",
      "additional_info": "Known for Windows, Office, and Azure cloud services."
    },
    {
      "name": "Amazon",
      "address": "410 Terry Ave N, Seattle, WA 98109, USA",
      "phone": "+1-888-280-4331",
      "website": "https://www.amazon.com",
      "image": "amazon-logo.png",
      "additional_info": "E-commerce and cloud computing leader."
    },
    {
      "name": "Meta",
      "address": "1 Hacker Way, Menlo Park, CA 94025, USA",
      "phone": "+1-650-543-4800",
      "website": "https://www.meta.com",
      "image": "meta-logo.png",
      "additional_info": "Parent company of Facebook, Instagram, and WhatsApp."
    },
    {
      "name": "Intel",
      "address": "2200 Mission College Blvd, Santa Clara, CA 95054, USA",
      "phone": "+1-408-765-8080",
      "website": "https://www.intel.com",
      "image": "intel-logo.png",
      "additional_info": "World's largest semiconductor chip manufacturer."
    },
  ];

  const companyList = document.getElementById('companyList');
  if (!companyList) return;
  companyList.innerHTML = '';

  companies.forEach(c => {
    const el = document.createElement('article');
    el.className = 'company-card';
    el.innerHTML = `
      <h3 class="company-name">${c.name}</h3>
      <div class="company-tagline">${c.additional_info}</div>
      <hr>
      <div class="company-info">
        <img src="${c.image}" alt="${c.name} logo" class="company-logo">
        <div class="company-details">
          <div>Email: info@${c.name.toLowerCase().replace(/\s/g,'')}.com</div>
          <div>Phone: ${c.phone}</div>
          <div>URL: <a href="${c.website}" target="_blank">${c.website}</a></div>
        </div>
      </div>
    `;
    companyList.appendChild(el);
  });
}

// ---- Load companies
loadCompanies();



// ---- Spotlights
function loadSpotlights(){
  try {
    const raw = document.getElementById('members-data')?.textContent;
    if(!raw) return;
    const data = JSON.parse(raw);
    let members = data.members.filter(m => m.level === 'gold' || m.level === 'silver');
    for (let i = members.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [members[i], members[j]] = [members[j], members[i]];
    }
    const picks = members.slice(0, Math.min(3, Math.max(2, members.length)));
    if(spotlightContainer){
      spotlightContainer.innerHTML = '';
      picks.forEach(m => {
        const el = document.createElement('article');
        el.className = 'spot-card';
        el.innerHTML = `
          <img src="${m.logo}" alt="${m.company} logo" loading="lazy" width="160" height="160">
          <h3>${m.company}</h3>
          <div class="muted">${(m.level||'').toUpperCase()} member</div>
          <p class="small">${m.address} • ${m.phone}</p>
          <a class="visit" href="${m.website}" target="_blank" rel="noopener">Visit website</a>
        `;
        spotlightContainer.appendChild(el);
      });
    }
  } catch(err){
    console.error('Spotlights load error', err);
  }
}
loadSpotlights();

// weather

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?lat=-12.0464&lon=-77.0428&units=metric&appid=be2b479e21a9f21bd67e04e95c0b99f4";

async function loadWeather(){
  const nowEl = document.getElementById('weatherNow');
  const forecastEl = document.getElementById('forecastList');

  try {
    const response = await fetch(WEATHER_URL);
    if(!response.ok) throw new Error('Weather API ' + response.status);
    const data = await response.json();

    if(nowEl){
      const tempC = Math.round(data.main.temp);
      const tempF = Math.round(tempC * 9/5 + 32); // Convertir a Fahrenheit
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const tempMax = Math.round(data.main.temp_max);
      const tempMin = Math.round(data.main.temp_min);
      const humidity = data.main.humidity;
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});

      nowEl.innerHTML = `
        <div class="weather-now">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" loading="lazy" width="50" height="50">
          <div>
            <div class="temp">${tempF}°F</div>
            <div class="meta" style="text-transform:capitalize">${desc}</div>
            <div class="small muted">High: ${Math.round(tempMax*9/5+32)}°F • Low: ${Math.round(tempMin*9/5+32)}°F</div>
            <div class="small muted">Humidity: ${humidity}%</div>
            <div class="small muted">Sunrise: ${sunrise} • Sunset: ${sunset}</div>
          </div>
        </div>
      `;
    }

    // Forecast: next 3 days (como ya lo tenías)
    if(forecastEl){
      forecastEl.innerHTML = '';
      for(let i=1;i<=3;i++){
        const date = new Date();
        date.setDate(date.getDate() + i);
        const label = date.toLocaleDateString('es-PE', { weekday:'short', month:'short', day:'numeric' });
        const item = document.createElement('div');
        item.className = 'forecast-item';
        const max = Math.round(data.main.temp + 2*i);
        const min = Math.round(data.main.temp - i);
        item.innerHTML = `<div class="f-day">${label}</div><div class="f-temp">${max}° / ${min}°</div>`;
        forecastEl.appendChild(item);
      }
    }

  } catch(err){
    console.error('Weather load error', err);
    if(nowEl) nowEl.innerHTML = '<div class="muted">No se pudo cargar el clima.</div>';
    if(forecastEl) forecastEl.innerHTML = '';
  }
}

loadWeather();

// companies




// ---- reset nav on resize
window.addEventListener('resize', () => {
  if(window.innerWidth > 768){
    const ul = document.querySelector('nav.main-nav .links');
    if(ul) ul.style.display = '';
    if(mainNav) mainNav.classList.remove('open');
    if(hamburger) hamburger.classList.remove('open');
    setAriaExpanded(hamburger, false);
    document.body.style.overflow = '';
  }
});
