import React, { useState } from 'react';
import { useSearchNotesQuery } from '../redux/api/notesApi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectTheme } from '../redux/theme/themeSlice';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  
  const { data: searchResults, isFetching } = useSearchNotesQuery(searchTerm, {
    skip: !searchTerm
  });

  const handleCloseNote = () => {
    setSelectedNote(null);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <header className="text-center mb-8">
      <div className="container mx-auto px-4">
        <div className="relative flex justify-center items-center mb-6">
          <h1 className="text-5xl font-medieval italic font-bold dark:text-gray-200 text-gray-800">
            Westeros Notes
          </h1>
          <button
            onClick={() => dispatch(toggleTheme())}
            className="absolute right-0 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
        <div className="relative max-w-md mx-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              🔍
            </span>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-400 dark:border-gray-600 
                       focus:outline-none focus:ring-2 focus:ring-red-700 dark:focus:ring-red-500 
                       text-base shadow-sm pl-10 pr-10
                       bg-gray-100 dark:bg-gray-700 
                       text-gray-800 dark:text-gray-200 
                       placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Arama yap..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 
                         text-gray-500 dark:text-gray-400 
                         hover:text-red-600 dark:hover:text-red-400
                         p-1 rounded-full
                         hover:bg-gray-200 dark:hover:bg-gray-600
                         transition-colors"
                title="Aramayı temizle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Arama Sonuçları */}
          {searchTerm && (
            <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl 
                         border border-gray-200 dark:border-gray-700 z-10 max-h-96 overflow-auto">
              {isFetching ? (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
                  <div className="mt-2">Aranıyor...</div>
                </div>
              ) : searchResults?.length === 0 ? (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  Sonuç bulunamadı
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {searchResults?.map(note => (
                    <div
                      key={note.id}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => setSelectedNote(note)}
                      style={{ borderLeft: `4px solid ${note.color}` }}
                    >
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {note.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {note.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Not Detay Modalı */}
          {selectedNote && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={handleCloseNote}
            >
              <div 
                className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full shadow-2xl transform transition-all"
                style={{ borderLeft: `6px solid ${selectedNote.color}` }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-medieval text-gray-800 dark:text-gray-200">
                    {selectedNote.title}
                  </h2>
                  <button
                    onClick={handleCloseNote}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedNote.text}
                </div>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(selectedNote.createdAt).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;