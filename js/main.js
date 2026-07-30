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

  document.querySelectorAll('[data-drive-gallery]').forEach(function (gallery) {
    var photos;
    try {
      photos = JSON.parse(gallery.getAttribute('data-drive-gallery'));
    } catch (error) {
      return;
    }

    photos.forEach(function (photo, index) {
      var item = document.createElement('li');
      var image = document.createElement('img');
      var caption = document.createElement('span');

      item.className = 'gallery-item';
      image.src = 'https://drive.google.com/thumbnail?id=' + encodeURIComponent(photo.id) + '&sz=w1200';
      image.width = 1200;
      image.height = 900;
      image.alt = 'Eternal Courage Tattoo gallery photo ' + (index + 1);
      image.loading = 'lazy';
      image.decoding = 'async';
      caption.className = 'cap mono';
      caption.textContent = photo.name.replace(/\.[^.]+$/, '').replace('_', ' ');

      item.appendChild(image);
      item.appendChild(caption);
      gallery.appendChild(item);
    });
  });
})();
