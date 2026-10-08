// Replaces the build-time snapshot with live public GitHub data when the API answers.
// Unauthenticated, cached for 10 minutes in sessionStorage; any failure keeps the snapshot.
(() => {
  const root = document.getElementById('gh');
  if (!root) return;
  const user = root.dataset.user;
  const KEY = 'gh-live-' + user, TTL = 10 * 60 * 1000;
  const $ = (id) => document.getElementById(id);
  const fmt = new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' });
  const verbs = { PushEvent: 'Pushed to', ReleaseEvent: 'Released', PullRequestEvent: 'Pull request in', CreateEvent: 'Created' };

  async function load() {
    try {
      const c = JSON.parse(sessionStorage.getItem(KEY) || 'null');
      if (c && Date.now() - c.t < TTL) return c;
    } catch (e) { /* storage unavailable */ }
    const get = (p) => fetch('https://api.github.com' + p, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });
    const [u, repos, ev] = await Promise.all([
      get('/users/' + user),
      get('/users/' + user + '/repos?per_page=100&type=owner'),
      get('/users/' + user + '/events/public?per_page=30'),
    ]);
    const d = {
      t: Date.now(), followers: u.followers, repos: u.public_repos,
      stars: repos.reduce((n, r) => n + r.stargazers_count, 0),
      events: ev.filter((e) => verbs[e.type]).filter((e, i, a) => a.findIndex((x) => x.type === e.type && x.repo.name === e.repo.name && x.created_at.slice(0, 10) === e.created_at.slice(0, 10)) === i).slice(0, 8).map((e) => ({ type: e.type, repo: e.repo.name, at: e.created_at })),
    };
    try { sessionStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* ignore */ }
    return d;
  }

  load().then((d) => {
    $('gh-repos').textContent = d.repos;
    $('gh-stars').textContent = d.stars;
    $('gh-followers').textContent = d.followers;
    const feed = $('gh-feed');
    if (d.events.length) {
      feed.textContent = '';
      d.events.forEach((e) => {
        const li = document.createElement('li');
        const when = document.createElement('span');
        when.className = 'mono'; when.textContent = fmt.format(new Date(e.at));
        const a = document.createElement('a');
        a.href = 'https://github.com/' + e.repo; a.textContent = e.repo;
        const body = document.createElement('span');
        body.append(verbs[e.type] + ' ', a);
        li.append(when, body);
        feed.append(li);
      });
    }
    const b = $('gh-badge'); b.textContent = 'Live'; b.dataset.s = 'released';
    $('gh-when').textContent = 'fetched ' + new Date(d.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }).catch(() => { /* keep snapshot */ });
})();
