function removeDoorLoader(loader) {
  const removeAfterOpen = (event) => {
    if (event.animationName === 'rightOpen') {
      loader.removeEventListener('animationend', removeAfterOpen);
      loader.remove();
    }
  };

  loader.addEventListener('animationend', removeAfterOpen);
}

function mountDoorLoader() {
  document.querySelectorAll('.door-loader').forEach((node) => node.remove());

  const loader = document.createElement('div');
  loader.className = 'door-loader';
  loader.setAttribute('aria-hidden', 'true');
  loader.innerHTML = `
    <div class="door-loader__panels"></div>
    <div class="door-loader__line"></div>
  `;

  document.body.appendChild(loader);
  removeDoorLoader(loader);
}

window.addEventListener('DOMContentLoaded', mountDoorLoader);