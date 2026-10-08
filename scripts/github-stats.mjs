// Build-time snapshot of public GitHub stats -> data/github.json.
// Used as the fallback the page shows before (or without) the live browser fetch.
// Never fails the build: on any error the existing file is left untouched.
import { writeFile, readFile } from 'node:fs/promises';

const USER = 'johnson-cooper';
const token = process.env.GITHUB_TOKEN || '';
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-stats',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function rest(path) {
  const r = await fetch(`https://api.github.com${path}`, { headers });
  if (!r.ok) throw new Error(`${path}: ${r.status}`);
  return r.json();
}

async function calendar() {
  if (!token) return null;
  const query = `query($u:String!){user(login:$u){contributionsCollection{
    contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}`;
  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST', headers, body: JSON.stringify({ query, variables: { u: USER } }),
  });
  if (!r.ok) return null;
  const j = await r.json();
  const c = j?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!c) return null;
  return {
    total: c.totalContributions,
    weeks: c.weeks.map((w) => w.contributionDays.map((d) => [d.date, d.contributionCount])),
  };
}

try {
  const [user, repos, events, cal] = await Promise.all([
    rest(`/users/${USER}`),
    rest(`/users/${USER}/repos?per_page=100&type=owner`),
    rest(`/users/${USER}/events/public?per_page=30`),
    calendar().catch(() => null),
  ]);
  const out = {
    generatedAt: new Date().toISOString(),
    login: USER,
    followers: user.followers,
    publicRepos: user.public_repos,
    stars: repos.reduce((n, r) => n + r.stargazers_count, 0),
    calendar: cal,
    events: events
      .filter((e) => ['PushEvent', 'ReleaseEvent', 'CreateEvent', 'PullRequestEvent'].includes(e.type))
      .filter((e, i, a) => a.findIndex((x) => x.type === e.type && x.repo.name === e.repo.name && x.created_at.slice(0, 10) === e.created_at.slice(0, 10)) === i)
      .slice(0, 8)
      .map((e) => ({
        type: e.type,
        repo: e.repo.name,
        at: e.created_at,
        n: e.type === 'PushEvent' ? (e.payload.size ?? e.payload.commits?.length ?? 0) : 0,
      })),
  };
  await writeFile(new URL('../data/github.json', import.meta.url), JSON.stringify(out) + '\n');
  console.log(`github.json: ${out.publicRepos} repos, ${out.stars} stars, calendar ${cal ? cal.total : 'n/a'}`);
} catch (e) {
  console.warn('github-stats skipped:', e.message);
  try { await readFile(new URL('../data/github.json', import.meta.url)); }
  catch { await writeFile(new URL('../data/github.json', import.meta.url), '{}\n'); }
}
