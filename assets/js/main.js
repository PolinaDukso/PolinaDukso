const toggleButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

if (toggleButton && navigation) {
  toggleButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}
