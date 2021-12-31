var hamburgerMenu = document.querySelector('#hamburgerMenu');
var hamburgerButton = document.querySelector ('#hamburgerButton');

window.isScrollBlocked = false;

function toggleMenu () {
  hamburgerButton.classList.toggle('hamburger--active');
  hamburgerMenu.classList.toggle('menu--active');
  window.isScrollBlocked = !window.isScrollBlocked;
}

hamburgerButton.addEventListener('click', function(event) {
  event.preventDefault();
  toggleMenu();
})

hamburgerMenu.addEventListener('click', e => {
  const target = e.target;

  if (target.classList.contains('menu__link')) {
    toggleMenu();
  }
});