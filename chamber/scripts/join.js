// Auto-fill timestamp on load
  document.getElementById('timestamp').value = new Date().toLocaleString();

  // Modal system
  const openModalLinks = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.close-modal');

  openModalLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modal = document.querySelector(link.getAttribute('href'));
      modal.style.display = 'flex';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
  



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

// last modifed (time)
if (lastMod) lastMod.textContent = document.lastModified || new Date().toLocaleDateString();
