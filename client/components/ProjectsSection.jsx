import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Spinner from './Spinner';
import { fetchGithubRepos } from '../services/api';

const GITHUB_USERNAME = 'Shivshady23';

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        const data = await fetchGithubRepos(GITHUB_USERNAME);
        if (!mounted) {
          return;
        }
        setProjects(data);
      } catch (err) {
        if (!mounted) {
          return;
        }
        setError(err.message || 'Unable to load projects.');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="projects" className="section">
      <SectionHeading title="Projects" subtitle="Live GitHub repositories fetched dynamically from the API." />

      {loading ? (
        <div className="projects-state glass">
          <Spinner />
          <p>Fetching latest repositories...</p>
        </div>
      ) : null}

      {!loading && error ? <p className="projects-error glass">{error}</p> : null}

      {!loading && !error ? (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Motion.article
              key={project.id}
              className="project-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              <h3>{project.name}</h3>
              <p className="project-desc">{project.description || 'No description available.'}</p>
              <div className="project-meta">
                <span>{project.language || 'N/A'}</span>
                <span>{project.stargazers_count} stars</span>
              </div>
              <a href={project.html_url} target="_blank" rel="noreferrer" className="project-link">
                View on GitHub
              </a>
            </Motion.article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default ProjectsSection;

