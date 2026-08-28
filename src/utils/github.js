const KEY = "ms-gh-stats";

export async function fetchGithubStats(user) {
  try {
    const cached = sessionStorage.getItem(KEY);
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
    sessionStorage.setItem(KEY, JSON.stringify(stats));
    return stats;
  } catch {
    return { publicRepos: null, followers: null, stars: null, forks: null, top: [] };
  }
}
