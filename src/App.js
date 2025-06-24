import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from './redux/theme/themeSlice';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    // Tema değiştiğinde HTML elementine dark class'ını ekle/çıkar
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-200">
      <div className="container mx-auto">
        <Header />
        <NoteForm />
        <NoteList />
      </div>
    </div>
  );
}

export default App;