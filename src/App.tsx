import React, { useEffect } from 'react';
import { TodoApp } from './components/TodoApp';

function App() {
  useEffect(() => {
    // Set initial theme based on system preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && isDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return <TodoApp />;
}

export default App;