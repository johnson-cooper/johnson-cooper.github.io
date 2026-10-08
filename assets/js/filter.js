// Progressive enhancement: without JS every project is listed.
(() => {
  const bar = document.getElementById('filters');
  const rows = [...document.querySelectorAll('.rows .row')];
  const count = document.getElementById('count');
  if (!bar || !rows.length) return;
  bar.hidden = false;
  bar.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-f]');
    if (!b) return;
    const f = b.dataset.f;
    bar.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    let n = 0;
    rows.forEach((r) => {
      const show = f === 'all' || r.dataset.status === f;
      r.hidden = !show;
      if (show) n++;
    });
    count.textContent = n + (n === 1 ? ' project' : ' projects');
  });
})();
