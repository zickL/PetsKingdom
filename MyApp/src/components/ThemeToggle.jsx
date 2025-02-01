import { useState }  from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
        Switch Theme
        </button>
    );
};

export default ThemeToggle;
