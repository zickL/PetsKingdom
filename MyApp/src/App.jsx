import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Privacy from './pages/Privacy';
import News from './pages/News';
import './styles/main.css';

const App = () => {
  const [page, setPage] = useState(window.location.hash || '#/');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = "MyApp";
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);



  return (
    <>
      <a href="#/" className="skiplink">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        {page === '#/' && <Home />}
        {page === '#/about' && <About />}
        {page === '#/register' && <Register />}
        {page === '#/privacy' && <Privacy />}
        {page === '#/news' && <News />}
      </main>
      <Footer />
  </>
  );
};

export default App;
