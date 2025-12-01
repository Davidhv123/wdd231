import { places } from "../data/places.mjs";
console.log(places)

// display the items
const showhere = document.querySelector("#allplaces")

// loop through the array of json items

function displayItems(places) {
    places.forEach(x => {

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
        const thedesc =document.createElement("p")
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)


        showhere.appendChild(thecard)
    })
}

// display teh cards
displayItems(places)


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

// last modifed (time)
if (lastMod) lastMod.textContent = document.lastModified || new Date().toLocaleDateString();
