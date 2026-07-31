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

    for (var number = 1256; number <= 1319; number += 1) {
      if (!missing[number]) photos.push('IMG_' + number + '.PNG');
    }

    photos.forEach(function (filename, index) {
      var item = document.createElement('li');
      var image = document.createElement('img');

      item.className = 'gallery-item';
      image.src = '/images/gallery/' + filename;
      image.width = 1200;
      image.height = 900;
      image.alt = 'Eternal Courage Tattoo gallery photo ' + (index + 1);
      image.loading = 'lazy';
      image.decoding = 'async';

      item.appendChild(image);
      gallery.appendChild(item);
    });
  });
})();
