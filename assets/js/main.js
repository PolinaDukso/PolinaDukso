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

// Case study TOC: highlight current section on scroll
const tocLinks = document.querySelectorAll('.case-toc a');
if (tocLinks.length) {
  const sections = [];
  tocLinks.forEach((link) => {
    const id = link.getAttribute('href').replace('#', '');
    const section = document.getElementById(id);
    if (section) sections.push({ link, section });
  });

  function updateToc() {
    const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
    if (atBottom) {
      tocLinks.forEach((l) => l.classList.remove('toc-active'));
      sections[sections.length - 1].link.classList.add('toc-active');
      return;
    }
    let current = sections[0];
    for (const entry of sections) {
      if (entry.section.getBoundingClientRect().top <= 120) {
        current = entry;
      }
    }
    tocLinks.forEach((l) => l.classList.remove('toc-active'));
    if (current) current.link.classList.add('toc-active');
  }

  window.addEventListener('scroll', updateToc, { passive: true });
  updateToc();
}
