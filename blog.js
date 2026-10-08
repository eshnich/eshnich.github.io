// Footnotes: hover shows the tooltip (pure CSS); this adds tap support for touch devices.
(function () {
  var footnotes = document.querySelectorAll('.footnote');

  function closeAll(except) {
    footnotes.forEach(function (fn) {
      if (fn !== except) fn.classList.remove('active');
    });
  }

  footnotes.forEach(function (fn) {
    var marker = fn.querySelector('.footnote-marker');
    if (!marker) return;
    marker.addEventListener('click', function (e) {
      e.stopPropagation();
      var isActive = fn.classList.contains('active');
      closeAll(fn);
      fn.classList.toggle('active', !isActive);
    });
  });

  document.addEventListener('click', function () {
    closeAll(null);
  });
}());

// Table of contents: highlight the link for whichever section is in view.
(function () {
  var links = document.querySelectorAll('.toc a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var linkById = {};
  links.forEach(function (a) {
    linkById[a.getAttribute('href').slice(1)] = a;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = linkById[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('active'); });
        link.classList.add('active');
      });
    },
    { rootMargin: '-10% 0px -70% 0px' }
  );

  Object.keys(linkById).forEach(function (id) {
    observer.observe(document.getElementById(id));
  });
}());
