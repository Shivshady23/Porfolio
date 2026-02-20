import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';

const DEFAULT_THEME = 'dark';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    return savedTheme || DEFAULT_THEME;
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <AnimatePresence>{loading ? <LoadingScreen key="loading-screen" /> : null}</AnimatePresence>
      <div className="app-shell">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Home />
      </div>
    </>
  );
}

export default App;
