// ===================================
// 1. NUEVOS DATOS DE LAS EMPRESAS (JSON SIMULADO)
// ===================================
const companies = [
    {
      "name": "Apple",
      "address": "One Apple Park Way, Cupertino, CA 95014, USA",
      "phone": "+1-800-692-7753",
      "website": "https://www.apple.com",
      "image": "images/apple_company.webp",
      "membership_level": 3,
      "additional_info": "Specializes in consumer electronics and software."
    },
    {
      "name": "Google",
      "address": "1600 Amphitheatre Parkway, Mountain View, CA 94043, USA",
      "phone": "+1-650-253-0000",
      "website": "https://www.google.com",
      "image": "images/google_company.webp",
      "membership_level": 3,
      "additional_info": "Leader in internet-related services and products."
    },
    {
      "name": "Microsoft",
      "address": "One Microsoft Way, Redmond, WA 98052, USA",
      "phone": "+1-425-882-8080",
      "website": "https://www.microsoft.com",
      "image": "images/microsoft_company.webp",
      "membership_level": 3,
      "additional_info": "Known for Windows, Office, and Azure cloud services."
    },
    {
      "name": "Amazon",
      "address": "410 Terry Ave N, Seattle, WA 98109, USA",
      "phone": "+1-888-280-4331",
      "website": "https://www.amazon.com",
      "image": "images/amazon_company.webp",
      "membership_level": 2,
      "additional_info": "E-commerce and cloud computing leader."
    },
    {
      "name": "Meta",
      "address": "1 Hacker Way, Menlo Park, CA 94025, USA",
      "phone": "+1-650-543-4800",
      "website": "https://www.meta.com",
      "image": "images/meta_company.webp",
      "membership_level": 2,
      "additional_info": "Parent company of Facebook, Instagram, and WhatsApp."
    },
    {
      "name": "Intel",
      "address": "2200 Mission College Blvd, Santa Clara, CA 95054, USA",
      "phone": "+1-408-765-8080",
      "website": "https://www.intel.com",
      "image": "images/intel_company.webp",
      "membership_level": 1,
      "additional_info": "World's largest semiconductor chip manufacturer."
    },
    {
      "name": "NVIDIA",
      "address": "2788 San Tomas Expressway, Santa Clara, CA 95051, USA",
      "phone": "+1-408-486-2000",
      "website": "https://www.nvidia.com",
      "image": "images/nvidia_company.webp",
      "membership_level": 2,
      "additional_info": "Renowned for graphics processing units (GPUs)."
    }
];


// ===================================
// 2. FUNCIÓN PARA CREAR LAS TARJETAS DINÁMICAMENTE (MODIFICADA)
// ===================================
const display = document.querySelector("article");

// El nombre de la función ahora es más general: displayEntities
const displayEntities = (entityData) => {
    // Limpia el contenido actual
    display.innerHTML = ''; 

    entityData.forEach((company) => {
        // Crear elementos
        let section = document.createElement('section');
        let h3 = document.createElement('h3');
        let pAddress = document.createElement('p');
        let pPhone = document.createElement('p');
        let pInfo = document.createElement('p');
        let img = document.createElement('img');
        let a = document.createElement('a');

        // Asignar contenido y atributos (AQUÍ ESTÁ EL CAMBIO CLAVE)
        
        // El nombre de la compañía
        h3.textContent = company.name;
        
        // Dirección, teléfono e información adicional
        pAddress.textContent = `📍 Address: ${company.address}`;
        pPhone.textContent = `📞 Phone: ${company.phone}`;
        pInfo.textContent = `💡 Info: ${company.additional_info}`;
        pInfo.classList.add('info'); // Para darle un estilo si quieres en CSS

        // Imagen (usando 'image' y asumiendo una ruta base)
        img.setAttribute('src', company.image); 
        img.setAttribute('alt', `Logo of ${company.name}`);
        img.setAttribute('loading', 'lazy');

        // Enlace a la web (usando 'website')
        a.textContent = 'Visit Website';
        a.setAttribute('href', company.website);
        a.setAttribute('target', '_blank');

        // Agregar elementos a la sección
        section.appendChild(img);
        section.appendChild(h3);
        section.appendChild(pAddress);
        section.appendChild(pPhone);
        section.appendChild(pInfo);
        section.appendChild(a);

        // Agregar la sección al contenedor principal (<article>)
        display.appendChild(section);
    });
}


// ===================================
// 3. LÓGICA DE BOTONES (USANDO EL NUEVO ARREGLO)
// ===================================
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

// Añade un Listener para la carga inicial de la página
window.addEventListener('load', () => {
    // 🛑 Carga los nuevos datos (companies) con la nueva función (displayEntities)
    displayEntities(companies); 
    display.classList.add("grid");
});

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList); 

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}


// ===================================
// 3. LÓGICA DE Menu de hamburgesa y modo oscuro 
// ===================================

function setAriaExpanded(el, val) { 
  if (el) el.setAttribute('aria-expanded', val ? 'true' : 'false'); 
}

const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const navLinksUL = document.getElementById('navLinks');

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
}
