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
// ---------------------- CONTACT PAGE ------------------
// ------------------------------------------------------

const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Cargar datos guardados al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const savedEmail = localStorage.getItem('userEmail');
  const savedSubject = localStorage.getItem('userSubject');

  if (savedEmail) emailInput.value = savedEmail;
  if (savedSubject) subjectInput.value = savedSubject;
});

// Validación en tiempo real
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
  input.addEventListener('blur', validateField);
  input.addEventListener('input', clearError);
});

function validateField(e) {
  const field = e.target;
  const errorSpan = field.parentElement.querySelector('.error');

  if (field.validity.valid) {
    errorSpan.textContent = '';
    return true;
  }

  if (field.validity.valueMissing) {
    errorSpan.textContent = 'Este campo es obligatorio';
  } else if (field.validity.typeMismatch && field.type === 'email') {
    errorSpan.textContent = 'Ingresa un correo válido';
  } else if (field.validity.tooShort) {
    errorSpan.textContent = `Mínimo ${field.minLength} caracteres`;
  }
}

function clearError(e) {
  const errorSpan = e.target.parentElement.querySelector('.error');
  errorSpan.textContent = '';
}

// Enviar formulario
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validar todos los campos
  let isValid = true;
  [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
    if (!validateField({ target: field })) isValid = false;
  });

  if (!isValid) {
    alert('Por favor completa correctamente todos los campos');
    return;
  }

  // Guardar en LocalStorage
  localStorage.setItem('userEmail', emailInput.value);
  localStorage.setItem('userSubject', subjectInput.value);

  // Redirigir con URLSearchParams
  const params = new URLSearchParams({
    name: nameInput.value,
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value
  });

  window.location.href = `form-action.html?${params.toString()}`;
});