(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    closeNav();
  });

  // Highlight the current page's nav link
  var here = window.location.pathname.replace(/index\.html$/, '');
  nav.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === here || (href === '/' && (here === '' || here === '/'))) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('[data-local-gallery]').forEach(function (gallery) {
    var missing = { 1287: true, 1301: true, 1302: true, 1315: true };
    var photos = ['tattoo-gothic-portrait.png', 'tattoo-taz.png', 'IMG_1255.JPG'];
    var lightbox = document.createElement('div');
    var lightboxImage = document.createElement('img');
    var closeButton = document.createElement('button');

    for (var number = 1256; number <= 1319; number += 1) {
      if (!missing[number]) photos.push('IMG_' + number + '.PNG');
    }

    lightbox.className = 'gallery-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    closeButton.className = 'gallery-lightbox-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close expanded image');
    closeButton.textContent = '×';
    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);

    function closeLightbox() {
      lightbox.hidden = true;
      lightboxImage.removeAttribute('src');
      lightboxImage.removeAttribute('alt');
    }

    function openLightbox(src, alt) {
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      lightbox.hidden = false;
      closeButton.focus();
    }

    photos.forEach(function (filename, index) {
      var item = document.createElement('li');
      var button = document.createElement('button');
      var image = document.createElement('img');
      var alt = 'Eternal Courage Tattoo gallery photo ' + (index + 1);

      item.className = 'gallery-item gallery-item-work';
      button.className = 'gallery-open';
      button.type = 'button';
      button.setAttribute('aria-label', 'Expand gallery photo ' + (index + 1));
      image.src = '/images/gallery/' + filename;
      image.width = 1200;
      image.height = 900;
      image.alt = alt;
      image.loading = 'lazy';
      image.decoding = 'async';

      button.addEventListener('click', function () {
        openLightbox(image.src, alt);
      });

      button.appendChild(image);
      item.appendChild(button);
      gallery.appendChild(item);
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (!lightbox.hidden && event.key === 'Escape') closeLightbox();
    });
  });
})();
