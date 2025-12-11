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

// ------------------------------------------------------
// ---------------------- PROJECTS PAGE --------------------
// ------------------------------------------------------
import { projects } from "../data/projects.mjs";
console.log(projects)

const showhere = document.getElementById("my-projects")

function displayItems(projects) {
  projects.forEach(x => {

    // build the card element
    const thecard = document.createElement("div")

    // build the photo element
    const thephoto = document.createElement("img")
    thephoto.src = `images/${x.photo_link}`
    thephoto.alt = x.titulo
    thecard.appendChild(thephoto)

    // build the title element
    const thetitle = document.createElement("h3")
    thetitle.innerText = x.titulo
    thecard.appendChild(thetitle)

    // build the description element
    const thedesc = document.createElement("p")
    thedesc.innerText = x.description
    thecard.appendChild(thedesc)

    // build the year element
    const theaddress = document.createElement("p")
    theaddress.innerText = x.monthYear
    thecard.appendChild(theaddress)


    showhere.appendChild(thecard)
  })
}

displayItems(projects)