// Date 
const date = new Date();

const last = document.getElementById("current_date");
last.textContent = `Last Update: ${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
})} ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
})}`;




async function fetchMembers() {
  try {
      // Obtén los datos del archivo JSON
      const response = await fetch('../data/members.json');
      const members = await response.json();

      // Contenedor de tarjetas
      const membersContainer = document.getElementById('members');

      // Generar una tarjeta por cada miembro
      members.forEach((member) => {
          const card = document.createElement('div');
          card.classList.add('business-card');

          card.innerHTML = `
              <header>
                  <h2>${member.name}</h2>
                  <p>${member.tagline || 'Business Tagline'}</p>
              </header>
              <main>
                  <img src="${member.image}" alt="${member.name} Logo">
                  <p><strong>Email:</strong> ${member.email}</p>
                  <p><strong>Phone:</strong> ${member.phone}</p>
                  <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
              </main>
          `;

          // Agregar la tarjeta al contenedor
          membersContainer.appendChild(card);
      });
  } catch (error) {
      console.error('Error fetching members:', error);
  }
}

// Ejecutar la función al cargar la página
fetchMembers();
