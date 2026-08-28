const STATS_KEY = "ms-gh-stats";
const HEAT_KEY = "ms-gh-heat-v2";

export async function fetchGithubStats(user) {
  try {
    const cached = sessionStorage.getItem(STATS_KEY);
    if (cached) return JSON.parse(cached);

    const [profileRes, repoRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`),
    ]);
    if (!profileRes.ok) throw new Error("profile");
    const profile = await profileRes.json();
    const repos = repoRes.ok ? await repoRes.json() : [];
    const stats = {
      publicRepos: profile.public_repos ?? repos.length,
      followers: profile.followers ?? 0,
      stars: repos.reduce((n, r) => n + (r.stargazers_count || 0), 0),
      forks: repos.reduce((n, r) => n + (r.forks_count || 0), 0),
      top: [...repos]
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        .slice(0, 3)
        .map((r) => ({ name: r.name, stars: r.stargazers_count, url: r.html_url })),
    };
    sessionStorage.setItem(STATS_KEY, JSON.stringify(stats));
    return stats;
  } catch {
    return { publicRepos: null, followers: null, stars: null, forks: null, top: [] };
  }
}

export async function fetchGithubHeatmap(user) {
  try {
    const cached = sessionStorage.getItem(HEAT_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (!parsed.weeks?.length && parsed.days?.length) {
        parsed.weeks = contributionsToWeeks(parsed.days);
      }
      return parsed;
    }
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}`);
    if (!res.ok) throw new Error("heat");
    const data = await res.json();
    const all = (data.contributions || []).filter((d) => d?.date);
    all.sort((a, b) => a.date.localeCompare(b.date));
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 370);
    const iso = cutoff.toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    const days = all.filter((d) => d.date >= iso && d.date <= today);
    const total = days.reduce((n, d) => n + (d.count || 0), 0);
    const payload = { days, weeks: contributionsToWeeks(days), total, year: new Date().getFullYear() };
    sessionStorage.setItem(HEAT_KEY, JSON.stringify(payload));
    return payload;
  } catch {
    return { days: [], weeks: [], total: 0, year: new Date().getFullYear() };
  }
}

export function contributionsToWeeks(days) {
  if (!days?.length) return [];
  const first = new Date(`${days[0].date}T00:00:00`);
  const pad = Number.isNaN(first.getTime()) ? 0 : first.getDay();
  const cells = [...Array(pad).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    const chunk = cells.slice(i, i + 7);
    while (chunk.length < 7) chunk.push(null);
    weeks.push(chunk);
  }
  return weeks;
}
