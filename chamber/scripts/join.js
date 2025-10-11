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