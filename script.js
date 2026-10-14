(function () {
  const doc = document.getElementById('doc');
  const toc = document.getElementById('toc');
  const search = document.getElementById('search');
  const count = document.getElementById('count');
  const root = document.documentElement;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* Theme and mobile menu */
  function setTheme(t) { root.dataset.theme = t; store.set('theme', t); }
  setTheme(store.get('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  document.getElementById('theme').onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  document.getElementById('menu').onclick = (e) => {
    const open = document.body.classList.toggle('nav-open');
    e.currentTarget.setAttribute('aria-expanded', open);
  };
  toc.addEventListener('click', (e) => { if (e.target.closest('a')) document.body.classList.remove('nav-open'); });

  /* The reviewer is embedded in reviewer.js. If a full reviewer.md sits next to index.html, it replaces it. */
  if (window.REVIEWER_MD) render(window.REVIEWER_MD);
  else doc.innerHTML = '<p class="status">reviewer.js is missing.</p>';
  fetch('reviewer.md')
    .then((r) => (r.ok ? r.text() : null))
    .then((t) => { if (t && t.trim().startsWith('#')) render(t); })
    .catch(() => {});

  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('nav-open') && !toc.contains(e.target) && e.target.id !== 'menu') {
      document.body.classList.remove('nav-open');
      document.getElementById('menu').setAttribute('aria-expanded', 'false');
    }
  });

  /* Wrap "Art. 1179" style citations in a tag so they are easy to scan */
  function tagArticles(node) {
    const re = /\bArts?\.\s\d{1,4}(?:,\s\d{1,4})*(?:\s(?:to|and)\s\d{1,4})?/g;
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => n.parentElement.closest('h1,h2,h3,a,code') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      const text = n.nodeValue;
      re.lastIndex = 0;
      if (!re.test(text)) return;
      re.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let i = 0, m;
      while ((m = re.exec(text))) {
        frag.append(text.slice(i, m.index));
        const s = document.createElement('span');
        s.className = 'art';
        s.textContent = m[0];
        frag.append(s);
        i = m.index + m[0].length;
      }
      frag.append(text.slice(i));
      n.replaceWith(frag);
    });
  }

  function section(cls, heading, id) {
    const s = document.createElement('section');
    s.className = cls;
    heading.id = id;
    s.append(heading);
    return s;
  }

  function render(md) {
    if (!window.marked) {
      doc.innerHTML = '<p class="status">The Markdown library did not load. Check your connection and reload.</p>';
      return;
    }
    const tpl = document.createElement('div');
    tpl.innerHTML = marked.parse(md);

    // The sidebar replaces the in-document contents list
    const contents = [...tpl.querySelectorAll('h2')].find((h) => h.textContent.trim() === 'Contents');
    if (contents) {
      const next = contents.nextElementSibling;
      if (next && /^(OL|UL)$/.test(next.tagName)) next.remove();
      contents.remove();
    }
    tpl.querySelectorAll('table').forEach((t) => {
      const wrap = document.createElement('div');
      wrap.className = 'tablewrap';
      t.replaceWith(wrap);
      wrap.append(t);
    });
    tagArticles(tpl);

    // Group into title, parts (h2) and topics (h3)
    const out = document.createDocumentFragment();
    let part = null, topic = null, n = 0;
    [...tpl.children].forEach((el) => {
      if (el.tagName === 'H1') {
        const head = document.createElement('header');
        head.className = 'title';
        head.append(el);
        document.title = el.textContent;
        out.append(head);
        part = head; topic = null;
      } else if (el.tagName === 'H2') {
        part = section('part', el, 's' + n++);
        topic = null;
        out.append(part);
      } else if (el.tagName === 'H3') {
        topic = section('topic', el, 's' + n++);
        (part || out).append(topic);
      } else {
        (topic || part || out).append(el);
      }
    });
    doc.replaceChildren(out);

    // Repair links that pointed at the original document's heading ids
    const ids = new Map();
    doc.querySelectorAll('h2,h3').forEach((h) => ids.set(h.textContent.trim(), h.id));
    doc.querySelectorAll('a[href^="#"]').forEach((a) => {
      if (document.getElementById(a.getAttribute('href').slice(1))) return;
      const id = ids.get(a.textContent.trim());
      if (id) a.setAttribute('href', '#' + id);
    });

    buildToc();
    watchScroll();
  }

  function buildToc() {
    toc.innerHTML = '';
    doc.querySelectorAll('.part').forEach((p) => {
      const h = p.querySelector(':scope > h2');
      const d = document.createElement('details');
      d.open = true;
      d.innerHTML = '<summary><a href="#' + h.id + '"></a></summary><ul></ul>';
      d.querySelector('a').textContent = h.textContent;
      const ul = d.querySelector('ul');
      p.querySelectorAll(':scope > .topic > h3').forEach((t) => {
        const li = document.createElement('li');
        li.innerHTML = '<a href="#' + t.id + '"></a>';
        li.firstChild.textContent = t.textContent;
        ul.append(li);
      });
      toc.append(d);
    });
  }

  function watchScroll() {
    const links = new Map([...toc.querySelectorAll('a')].map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const a = links.get(e.target.id);
        if (!e.isIntersecting || !a) return;
        toc.querySelectorAll('.on').forEach((x) => x.classList.remove('on'));
        a.classList.add('on');
        const d = a.closest('details');
        if (d) d.open = true;
      });
    }, { rootMargin: '0px 0px -75% 0px' });
    doc.querySelectorAll('h2,h3').forEach((h) => io.observe(h));
  }

  /* Search: show only the topics that contain the text */
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let matches = 0;
    doc.querySelectorAll('.part').forEach((p) => {
      let any = false;
      p.querySelectorAll(':scope > .topic').forEach((t) => {
        const hit = !q || t.textContent.toLowerCase().includes(q);
        t.hidden = !hit;
        if (hit && q) matches++;
        any = any || hit;
      });
      p.querySelectorAll(':scope > :not(.topic):not(h2)').forEach((x) => { x.hidden = !!q; });
      p.hidden = !!q && !any;
    });
    count.textContent = q ? matches + (matches === 1 ? ' section' : ' sections') : '';
  });
})();
