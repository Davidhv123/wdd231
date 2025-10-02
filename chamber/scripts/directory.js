const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const darkToggle = document.querySelector('.dark-toggle');
const header = document.querySelector('.header');


// Menú hamburguesa
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('hidden');
  header.classList.toggle('active');
});


// Modo oscuro
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
