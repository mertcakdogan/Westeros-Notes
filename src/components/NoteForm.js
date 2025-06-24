import React, { useState } from 'react';
import { useAddNoteMutation } from '../redux/api/notesApi';
import { useSelector } from 'react-redux';
import { selectTheme } from '../redux/theme/themeSlice';

const HOUSE_COLORS = {
  stark: {
    light: '#4A5568',
    dark: '#2D3748',
  },
  targaryen: {
    light: '#F56565',
    dark: '#C53030',
  },
  lannister: {
    light: '#ED8936',
    dark: '#C05621',
  },
  baratheon: {
    light: '#4299E1',
    dark: '#2C5282',
  },
  greyjoy: {
    light: '#4299E1',
    dark: '#2B6CB0',
  },
  martell: {
    light: '#ECC94B',
    dark: '#B7791F',
  },
  tyrell: {
    light: '#48BB78',
    dark: '#2F855A',
  },
  arryn: {
    light: '#38B2AC',
    dark: '#2C7A7B',
  },
};

function NoteForm() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState(HOUSE_COLORS.stark.dark);
  const [addNote] = useAddNoteMutation();
  const theme = useSelector(selectTheme);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;

    try {
      await addNote({
        title: title.trim(),
        text: text.trim(),
        color: theme === 'dark' ? color.dark : color.light,
      });
      setTitle('');
      setText('');
      setColor(HOUSE_COLORS.stark);
    } catch (error) {
      console.error('Not eklenirken hata oluştu:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Not başlığı..."
          className="w-full mb-4 px-4 py-2 bg-gray-50 dark:bg-gray-700 
                   text-gray-800 dark:text-gray-200 
                   rounded-lg border border-gray-300 dark:border-gray-600 
                   focus:outline-none focus:ring-2 focus:ring-red-700 dark:focus:ring-red-500 
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Notunuzu yazın..."
          className="w-full h-32 px-4 py-2 mb-4 bg-gray-50 dark:bg-gray-700 
                   text-gray-800 dark:text-gray-200 
                   rounded-lg border border-gray-300 dark:border-gray-600 
                   focus:outline-none focus:ring-2 focus:ring-red-700 dark:focus:ring-red-500 
                   placeholder-gray-500 dark:placeholder-gray-400 
                   resize-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {Object.entries(HOUSE_COLORS).map(([house, colors]) => (
              <button
                key={house}
                type="button"
                onClick={() => setColor(colors)}
                className={`w-8 h-8 rounded-full transition-transform ${
                  color === colors ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 scale-110' : ''
                }`}
                style={{ backgroundColor: theme === 'dark' ? colors.dark : colors.light }}
                title={house.charAt(0).toUpperCase() + house.slice(1)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 dark:bg-red-700 text-white 
                     rounded-lg hover:bg-red-700 dark:hover:bg-red-800 
                     transition-colors focus:outline-none focus:ring-2 
                     focus:ring-red-500 focus:ring-offset-2 
                     focus:ring-offset-white dark:focus:ring-offset-gray-800 
                     font-medieval"
          >
            Not Ekle
          </button>
        </div>
      </div>
    </form>
  );
}

export default NoteForm;