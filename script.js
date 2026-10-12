// Depth reading on the rope, nav colour, and the newsletter dialog.

const nav = document.querySelector('.nav');
const hero = document.querySelector('.surface');
const lanyard = document.querySelector('.lanyard');
const depthOut = document.getElementById('depth');

// [page y, depth in metres] pairs: the waterline, each course mark, the bottom plate.
let anchors = [];
let readY = 0;
let heroEnd = 0;

function measure() {
  const pageY = (el) => el.getBoundingClientRect().top + scrollY;
  readY = lanyard.getBoundingClientRect().top;
  heroEnd = pageY(hero) + hero.offsetHeight;

  const lastReachable = document.documentElement.scrollHeight - innerHeight + readY;
  anchors = [
    [pageY(document.querySelector('.surface__wave')), 0],
    ...[...document.querySelectorAll('.stop')].map((stop) => [
      pageY(stop.querySelector('.stop__mark')),
      Number(stop.dataset.depth),
    ]),
    [Math.min(pageY(document.querySelector('.plate')), lastReachable), 50],
  ];
}

function depthAt(y) {
  if (y <= anchors[0][0]) return 0;
  for (let i = 1; i < anchors.length; i++) {
    const [y0, d0] = anchors[i - 1];
    const [y1, d1] = anchors[i];
    if (y <= y1) return d0 + ((y - y0) / (y1 - y0)) * (d1 - d0);
  }
  return anchors[anchors.length - 1][1];
}

function update() {
  depthOut.textContent = Math.round(depthAt(scrollY + readY));
  nav.classList.toggle('is-scrolled', scrollY > 8);
  // The water behind the nav is already dark a little past halfway down the hero.
  nav.classList.toggle('is-deep', scrollY > heroEnd * 0.55);
}

let queued = false;
addEventListener('scroll', () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; update(); });
}, { passive: true });

function refresh() { measure(); update(); }
addEventListener('resize', refresh);
addEventListener('load', refresh);
document.fonts.ready.then(refresh);
refresh();

// Newsletter
const dialog = document.getElementById('newsletter');
const form = document.getElementById('nl-form');
const done = document.getElementById('nl-done');

document.querySelectorAll('[data-newsletter]').forEach((button) => {
  button.addEventListener('click', () => dialog.showModal());
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.hidden = true;
  done.hidden = false;
});
