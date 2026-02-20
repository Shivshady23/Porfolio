const GITHUB_BASE_URL = 'https://api.github.com';
const DEFAULT_API_BASE = 'http://localhost:5000';
const EXCLUDED_REPOSITORIES = new Set(['valentine-wishies', 'valentine-wishies---saloni']);

export const getBackendBaseUrl = () => {
  return process.env.API_BASE_URL || DEFAULT_API_BASE;
};

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

export async function submitContactForm(payload) {
  const baseUrl = getBackendBaseUrl();
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit form.');
  }

  return data;
}
