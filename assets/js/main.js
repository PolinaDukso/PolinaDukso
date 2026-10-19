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

  // an open menu must not cover whatever gets focus or a tap next
  const header = toggleButton.closest('.site-header');
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) closeNav();
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeNav();
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Home case list: the application card goes through its statuses once the
// reader has scrolled to it and the whole card is on screen
const demo = document.querySelector('.demo');
if (demo && 'IntersectionObserver' in window && !reduceMotion.matches) {
  demo.classList.add('is-armed');
  const siteHeader = document.querySelector('.site-header');
  let scrolled = false;
  let inView = false;
  let timer = null;

  const play = () => {
    demo.classList.add('is-playing');
    observer.disconnect();
    window.removeEventListener('scroll', onScroll);
  };
  // a short dwell, so a card that is only scrolled past does not play unseen
  const update = () => {
    clearTimeout(timer);
    if (scrolled && inView) timer = setTimeout(play, 400);
  };
  // a card already visible on a tall screen waits for the first scroll
  const onScroll = () => {
    if (scrolled) return;
    scrolled = true;
    update();
  };

  const observer = new IntersectionObserver(([entry]) => {
    const viewport = entry.rootBounds ? entry.rootBounds.height : window.innerHeight;
    // a card taller than the screen counts as seen when it fills most of it
    inView = entry.isIntersecting
      && (entry.intersectionRatio > 0.95 || entry.intersectionRect.height >= viewport * 0.8);
    update();
  }, {
    rootMargin: `-${siteHeader ? siteHeader.offsetHeight : 0}px 0px 0px 0px`,
    threshold: Array.from({ length: 21 }, (_, i) => i / 20),
  });
  observer.observe(demo);
  window.addEventListener('scroll', onScroll, { passive: true });
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
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
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
    lightbox.setAttribute('aria-label', img.alt);
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
