// Publications toggle: Selected / All / By Topic
(function () {
  var btnSelected = document.getElementById('btn-selected');
  var btnAll      = document.getElementById('btn-all');
  var btnByTopic  = document.getElementById('btn-by-topic');
  var extras      = document.querySelectorAll('.paper-extra');
  var pubList     = document.getElementById('pub-list');

  // Build the by-topic view lazily
  var topicList = document.createElement('div');
  topicList.id = 'topic-list';
  topicList.style.display = 'none';
  pubList.parentNode.insertBefore(topicList, pubList.nextSibling);
  var topicListBuilt = false;

  var TOPICS = [
    { key: 'rl',   label: 'Representation Learning',    cls: 'topic-rl'   },
    { key: 'tc',   label: 'Transformer Capabilities',   cls: 'topic-tc'   },
    { key: 'mot',  label: 'Modern Optimization Theory', cls: 'topic-mot'  },
    { key: 'misc', label: 'Misc. Statistics',           cls: 'topic-misc' },
  ];

  function buildTopicList() {
    var allPapers = pubList.querySelectorAll('.paper');
    TOPICS.forEach(function (topic) {
      var matching = Array.prototype.filter.call(allPapers, function (p) {
        return p.querySelector('.topic-' + topic.key);
      });
      if (!matching.length) return;

      var heading = document.createElement('p');
      heading.className = 'topic-group-heading';
      var badge = document.createElement('strong');
      badge.className = 'topic-tag ' + topic.cls;
      badge.textContent = topic.label;
      heading.appendChild(badge);
      topicList.appendChild(heading);

      matching.forEach(function (paper) {
        var clone = paper.cloneNode(true);
        clone.style.display = 'block';
        topicList.appendChild(clone);
      });
    });
    topicListBuilt = true;
  }

  function showSelected() {
    btnSelected.classList.add('active');
    btnAll.classList.remove('active');
    btnByTopic.classList.remove('active');
    pubList.style.display = '';
    topicList.style.display = 'none';
    extras.forEach(function (el) { el.style.display = 'none'; });
  }

  function showAll() {
    btnAll.classList.add('active');
    btnSelected.classList.remove('active');
    btnByTopic.classList.remove('active');
    pubList.style.display = '';
    topicList.style.display = 'none';
    extras.forEach(function (el) { el.style.display = 'block'; });
  }

  function showByTopic() {
    btnByTopic.classList.add('active');
    btnSelected.classList.remove('active');
    btnAll.classList.remove('active');
    pubList.style.display = 'none';
    if (!topicListBuilt) buildTopicList();
    topicList.style.display = '';
  }

  btnSelected.addEventListener('click', showSelected);
  btnAll.addEventListener('click', showAll);
  btnByTopic.addEventListener('click', showByTopic);

  // Initial state
  extras.forEach(function (el) { el.style.display = 'none'; });
}());
