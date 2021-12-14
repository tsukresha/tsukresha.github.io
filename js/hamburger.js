var hamburgerMenu = document.querySelector('#hamburgerMenu');
var hamburgerButton = document.querySelector ('#hamburgerButton');

hamburgerButton.addEventListener('click', function(event) {
  event.preventDefault();
  hamburgerButton.classList.toggle('hamburger--active');
  hamburgerMenu.classList.toggle('menu--active');
})