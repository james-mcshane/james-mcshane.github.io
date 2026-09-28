(() => {
  'use strict';
  const data = window.PORTFOLIO;
  if (!data) return;
  const media = window.PORTFOLIO_MEDIA || {};
  const allItems = [data.reel, ...data.films, ...data.campaigns, ...data.projects];
  allItems.forEach(item => Object.assign(item, media[item.id] || {}));
  const $ = selector => document.querySelector(selector);
  const grid = $('#work-grid');
  const dialog = $('#project-dialog');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let discipline = 'films';
  let filter = 'All';
  let layout = 'gallery';
  let activePreview = null;
  let previewCleanup = [];
  let dialogOpener = null;
  let dialogPreviousHash = '';
  let closingForHistory = false;
  const palette = [ ['#d8dfd3','#304936'], ['#2d3a37','#e6eadf'], ['#e2d6c4','#514539'], ['#ded9e3','#463c52'], ['#d5dce1','#314751'], ['#e6d3c7','#684438'] ];
  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function svgIcon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', `icon icon-${name}`);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('viewBox', '0 0 16 16');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (name === 'plus') {
      path.setAttribute('d', 'M8 4v8M4 8h8');
    } else if (name === 'arrow-up-right') {
      path.setAttribute('d', 'M4.5 11.5L11.5 4.5M6.5 4.5H11.5V9.5');
    }
    svg.appendChild(path);
    return svg;
  }
  function label(item) {
    return item.client && !item.title.toLowerCase().includes(item.client.toLowerCase()) ? `${item.client}: ${item.title}` : item.title;
  }
  function stopPreview() {
    if (!activePreview) return;
    activePreview.cancel();
    activePreview = null;
  }
  function attachPreview(trigger, surface, item) {
    if (!item.preview) return;
    let video;
    let generation = 0;
    let hovered = false;
    let focused = false;
    const cancel = () => {
      generation++;
      surface.classList.remove('is-previewing');
      if (video) { video.pause(); if (video.readyState > 0) video.currentTime = 0; }
    };
    const start = () => {
      if (motion.matches || !finePointer.matches || navigator.connection?.saveData || document.hidden || dialog.open) return;
      stopPreview();
      const thisGeneration = ++generation;
      activePreview = { cancel };
      if (!video) {
        video = node('video', 'preview-video');
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'none';
        video.setAttribute('aria-hidden', 'true');
        video.src = item.preview;
        video.addEventListener('error', cancel);
        surface.append(video);
      }
      video.play().then(() => {
        if (generation !== thisGeneration || (!hovered && !focused) || document.hidden || dialog.open) {
          video.pause();
          return;
        }
        surface.classList.add('is-previewing');
      }).catch(cancel);
    };
    trigger.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; start(); } });
    trigger.addEventListener('pointerleave', () => { hovered = false; if (!focused) cancel(); });
    trigger.addEventListener('focus', () => { focused = true; start(); });
    trigger.addEventListener('blur', () => { focused = false; if (!hovered) cancel(); });
    const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) cancel(); }, { threshold: .05 });
    observer.observe(trigger);
    return () => { cancel(); observer.disconnect(); };
  }
  function categories() {
    if (discipline === 'films') return ['All', 'Music video', 'Documentary', 'Commercial', 'Short film', 'Live & session'];
    if (discipline === 'campaigns') return ['All', 'Campaign', 'Music & live', 'Spatial'];
    return ['All', 'Apps', 'Tools & platforms'];
  }
  function matches(item) {
    if (filter === 'All') return true;
    const category = item.category.toLowerCase();
    if (filter === 'Live & session') return /live|session/.test(category);
    if (filter === 'Campaign') return ['apple-iphone','swarovski-ariana','johnnie-walker','vans-off-the-wall','dont-mess-with-texas','don-julio'].includes(item.id);
    if (filter === 'Music & live') return ['ed-sheeran','blink-182','tidal-brooklyn','olympic-handover'].includes(item.id);
    if (filter === 'Spatial') return /spatial|immersive|vr/.test(category);
    const apps = ['somnora','callsheet-companion','today-in-time','squadsync','homeplate','cosmo-trader'];
    if (filter === 'Apps') return apps.includes(item.id);
    if (filter === 'Tools & platforms') return !apps.includes(item.id);
    return category.includes(filter.toLowerCase());
  }
  function renderFilters() {
    const wrapper = $('#filters');
    wrapper.replaceChildren();
    categories().forEach(category => {
      const button = node('button', '', category);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(filter === category));
      button.addEventListener('click', () => {
        filter = category;
        wrapper.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        renderWork();
      });
      wrapper.append(button);
    });
  }
  function renderWork() {
    stopPreview();
    previewCleanup.forEach(cleanup => cleanup());
    previewCleanup = [];
    const items = data[discipline].filter(matches);
    grid.replaceChildren();
    grid.classList.toggle('is-index', layout === 'index');
    $('#work-count').textContent = `${String(items.length).padStart(2, '0')} ${items.length === 1 ? 'project' : 'projects'}`;
    items.forEach((item, index) => {
      const article = node('article', 'work-card');
      const button = node('button', 'card-open');
      button.type = 'button';
      button.setAttribute('aria-label', `Explore ${label(item)}`);
      button.dataset.project = item.id;
      const isProject = discipline === 'projects';
      const imageArea = node('div', `card-image${isProject ? ' project-art' : ''}`);
      if (isProject) {
        const [background, ink] = palette[index % palette.length];
        imageArea.style.setProperty('--project-bg', background);
        imageArea.style.setProperty('--project-ink', ink);
      }
      if (item.image) {
        const image = node('img');
        image.src = item.image;
        image.alt = isProject ? `${item.title} icon` : `Frame from ${label(item)}`;
        image.loading = 'lazy';
        image.decoding = 'async';
        image.width = isProject ? 128 : 960;
        image.height = isProject ? 128 : 600;
        imageArea.append(image);
      }
      if (isProject) {
        const titleArt = node('span', 'project-art-name', item.title);
        titleArt.append(node('small', '', item.category));
        imageArea.append(titleArt);
      } else {
        imageArea.append(node('span', 'card-number', String(index + 1).padStart(2, '0')));
      }
      const action = node('span', 'card-action');
      action.setAttribute('aria-hidden', 'true');
      action.appendChild(svgIcon(isProject || item.embed ? 'arrow-up-right' : 'plus'));
      imageArea.append(action);
      if (item.preview) imageArea.append(node('span', 'motion-indicator', 'Motion preview'));
      const meta = node('div', 'card-meta');
      meta.append(node('span', '', isProject ? item.category : item.client || item.category), node('span', '', isProject ? item.status : item.category));
      button.append(imageArea, meta, node('h3', 'card-title', item.title), node('p', 'card-role', item.role), node('p', 'card-description', item.description));
      button.addEventListener('click', () => openProject(item, button));
      article.append(button);
      grid.append(article);
      const cleanup = attachPreview(button, imageArea, item);
      if (cleanup) previewCleanup.push(cleanup);
    });
    if (!items.length) grid.append(node('p', '', 'No projects in this selection. Choose All to see the work.'));
  }
  function setDiscipline(next, updateURL = true) {
    if (!data[next]) return;
    discipline = next;
    filter = 'All';
    document.querySelectorAll('[data-discipline]').forEach(button => {
      const selected = button.dataset.discipline === next;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    $('#work-panel').setAttribute('aria-labelledby', `tab-${next}`);
    renderFilters();
    renderWork();
    if (updateURL) history.replaceState(null, '', `#${next === 'films' ? 'work' : next}`);
  }
  function openProject(item, opener, updateURL = true) {
    stopPreview();
    dialogOpener = opener || document.activeElement;
    dialogPreviousHash = location.hash;
    $('#dialog-category').textContent = item.category;
    $('#dialog-client').textContent = item.client || item.status || 'Independent project';
    $('#dialog-title').textContent = item.title;
    $('#dialog-role').textContent = item.role;
    $('#dialog-description').textContent = item.description;
    const container = $('#dialog-media');
    container.replaceChildren();
    container.classList.toggle('is-project', data.projects.includes(item));
    if (item.embed) {
      const iframe = node('iframe');
      iframe.title = `${label(item)} video player`;
      iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.src = item.embed;
      container.append(iframe);
    } else if (item.image) {
      const image = node('img');
      image.src = item.image;
      image.alt = label(item);
      container.append(image);
    }
    const details = $('#dialog-details');
    details.replaceChildren();
    if (item.details?.length) {
      const list = node('div', 'detail-list');
      item.details.forEach((detail, index) => {
        const row = node('div', 'detail-item');
        if (Array.isArray(detail)) row.append(node('strong', '', detail[0]), node('p', '', detail[1]));
        else row.append(node('strong', '', `0${index + 1}`), node('p', '', typeof detail === 'string' ? detail : detail.description || detail.title || ''));
        list.append(row);
      });
      details.append(list);
    }
    if (item.stack?.length) {
      const stack = node('div', 'stack-list');
      item.stack.forEach(technology => stack.append(node('span', '', technology)));
      details.append(stack);
    }
    const links = $('#dialog-links');
    links.replaceChildren();
    const itemLinks = item.links?.length ? item.links : item.url ? [{label: item.embed ? 'Watch on original site' : 'Visit project', url: item.url}] : [];
    itemLinks.forEach(link => {
      const a = node('a');
      a.textContent = link.label + ' ';
      a.appendChild(svgIcon('arrow-up-right'));
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      links.append(a);
    });
    if (!itemLinks.length) {
      const a = node('a');
      a.textContent = 'Ask me about this project ';
      a.appendChild(svgIcon('arrow-up-right'));
      a.href = 'mailto:jmcshanedp@gmail.com?subject=' + encodeURIComponent(item.title);
      links.append(a);
    }
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.scrollTop = 0;
    $('.dialog-close').focus({preventScroll:true});
    if (updateURL) history.pushState({portfolioProject: item.id}, '', `#project/${item.id}`);
  }
  function closeProject() { dialog.close(); }
  $('.dialog-close').addEventListener('click', closeProject);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeProject(); } });
  dialog.addEventListener('close', () => {
    $('#dialog-media').replaceChildren();
    document.body.classList.remove('dialog-open');
    if (!closingForHistory && location.hash.startsWith('#project/')) history.replaceState(null, '', dialogPreviousHash.startsWith('#project/') ? '#work' : dialogPreviousHash || location.pathname);
    closingForHistory = false;
    if (dialogOpener?.isConnected) dialogOpener.focus({preventScroll:true});
  });
  document.querySelectorAll('[data-discipline]').forEach((button, index, tabs) => {
    button.addEventListener('click', () => setDiscipline(button.dataset.discipline));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      setDiscipline(tabs[next].dataset.discipline);
    });
  });
  document.querySelectorAll('[data-layout]').forEach(button => button.addEventListener('click', () => {
    layout = button.dataset.layout;
    document.querySelectorAll('[data-layout]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    grid.classList.toggle('is-index', layout === 'index');
  }));
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopPreview(); });
  motion.addEventListener('change', stopPreview);
  finePointer.addEventListener('change', stopPreview);
  const reel = $('#reel-button');
  $('#reel-poster').src = data.reel.image;
  reel.addEventListener('click', () => openProject(data.reel, reel));
  attachPreview(reel, reel, data.reel);
  $('#reel-preview-hint').hidden = !data.reel.preview;
  function restoreURL() {
    if (dialog.open) { closingForHistory = true; dialog.close(); }
    const hash = location.hash;
    if (hash.startsWith('#project/')) {
      const item = allItems.find(p => p.id === hash.slice(9));
      if (item) openProject(item, null, false);
    } else if (hash === '#campaigns' || hash === '#projects') {
      setDiscipline(hash.slice(1), false);
    } else if (hash === '#work') setDiscipline('films', false);
  }
  window.addEventListener('popstate', restoreURL);
  renderFilters();
  renderWork();
  restoreURL();
})();
