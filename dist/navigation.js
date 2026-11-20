const panels = Array.from(document.querySelectorAll('.panel'));
const navigation = Array.from(document.querySelectorAll('nav a'));

function showSection(moveFocus = false) {
  const target = document.getElementById(location.hash.slice(1));
  if (target && !target.closest('.panel')) return;

  const current = target?.closest('.panel') ?? panels[0];
  for (const panel of panels) panel.hidden = panel !== current;
  for (const link of navigation) {
    if (link.hash === '#' + current.id) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  }

  if (moveFocus || (target && target !== current)) {
    const heading = (target ?? current).querySelector('h1, h2');
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    (target ?? current).scrollIntoView({ block: 'start' });
  }
}

showSection();
window.addEventListener('hashchange', () => showSection(true));
