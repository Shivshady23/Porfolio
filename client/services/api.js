const GITHUB_BASE_URL = 'https://api.github.com';
const EXCLUDED_REPOSITORIES = new Set(['valentine-wishies', 'valentine-wishies---saloni']);

export async function fetchGithubRepos(username) {
  const response = await fetch(`${GITHUB_BASE_URL}/users/${username}/repos`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch repositories from GitHub.');
  }

  const repositories = await response.json();
  return repositories
    .filter(
      (repo) => !repo.fork && !EXCLUDED_REPOSITORIES.has((repo.name || '').toLowerCase())
    )
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}
