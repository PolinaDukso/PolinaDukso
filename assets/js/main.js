const toggleButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav');

if (toggleButton && navigation) {
  const closeNav = () => {
    navigation.classList.remove('is-open');
    toggleButton.setAttribute('aria-expanded', 'false');
  };

  toggleButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeNav();
      toggleButton.focus();
    }
  });
}

// Case study TOC: highlight current section on scroll
const toc = document.querySelector('.case-toc');
const tocLinks = document.querySelectorAll('.case-toc a');
if (toc && tocLinks.length) {
  const header = document.querySelector('.site-header');
  const tocNav = toc.querySelector('nav');
  // below 1024px the TOC is a horizontal strip pinned under the header
  const stripMode = window.matchMedia('(max-width: 1024px)');
  const sections = [];
  tocLinks.forEach((link) => {
    const id = link.getAttribute('href').replace('#', '');
    const section = document.getElementById(id);
    if (section) sections.push({ link, section });
  });

  let activeLink = null;

  function setActive(link) {
    if (link === activeLink) return;
    tocLinks.forEach((l) => l.classList.remove('toc-active'));
    link.classList.add('toc-active');
    activeLink = link;
    if (stripMode.matches) {
      tocNav.scrollTo({
        left: link.offsetLeft - tocNav.offsetLeft - (tocNav.clientWidth - link.offsetWidth) / 2,
        behavior: 'smooth',
      });
    }
  }

  function updateToc() {
    if (!sections.length) return;
    const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
    if (atBottom) {
      setActive(sections[sections.length - 1].link);
      return;
    }
    const line = (header ? header.offsetHeight : 0) + (stripMode.matches ? toc.offsetHeight : 0) + 48;
    let current = sections[0];
    for (const entry of sections) {
      if (entry.section.getBoundingClientRect().top <= line) {
        current = entry;
      }
    }
    setActive(current.link);
  }

  window.addEventListener('scroll', updateToc, { passive: true });
  stripMode.addEventListener('change', updateToc);
  updateToc();
}

// Screenshots: open full size on click
const zoomImages = document.querySelectorAll('[data-zoom] img');
if (zoomImages.length && typeof HTMLDialogElement === 'function') {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<button class="lightbox-close" type="button" aria-label="Закрыть">×</button><img alt="">';
  document.body.append(lightbox);
  const fullImage = lightbox.querySelector('img');

  const open = (img) => {
    fullImage.src = img.currentSrc || img.src;
    fullImage.alt = img.alt;
    lightbox.showModal();
  };

  zoomImages.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Увеличить: ${img.alt}`);
    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(img);
      }
    });
  });

  lightbox.addEventListener('click', () => lightbox.close());
}
