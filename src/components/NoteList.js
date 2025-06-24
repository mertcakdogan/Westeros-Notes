import React, { useState } from 'react';
import { useGetNotesQuery, useDeleteNoteMutation, useUpdateNoteMutation } from '../redux/api/notesApi';

function NoteList() {
  const { data: notes, isLoading, isError } = useGetNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const [editColor, setEditColor] = useState('');

  const handleEdit = (note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditText(note.text);
    setEditColor(note.color);
  };

  const handleNoteClick = (note) => {
    if (!editingNote) {
      setSelectedNote(note);
    }
  };

  const handleCloseNote = () => {
    setSelectedNote(null);
  };

  const handleUpdate = async () => {
    if (!editTitle.trim() || !editText.trim()) return;

    try {
      await updateNote({
        id: editingNote.id,
        title: editTitle.trim(),
        text: editText.trim(),
        color: editColor,
      });
      setEditingNote(null);
    } catch (error) {
      console.error('Not güncellenirken hata oluştu:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteNote(id);
        if (selectedNote?.id === id) {
          setSelectedNote(null);
        }
      } catch (error) {
        console.error('Not silinirken hata oluştu:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600 dark:text-red-400">
        Notlar yüklenirken bir hata oluştu.
      </div>
    );
  }

  if (!notes?.length) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        Henüz not eklenmemiş.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {notes?.map((note) => (
        <div
          key={note.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-xl cursor-pointer"
          style={{ borderLeft: `6px solid ${note.color}` }}
          onClick={() => handleNoteClick(note)}
        >
          {editingNote?.id === note.id ? (
            // Düzenleme Formu
            <div className="p-4" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full mb-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 
                         text-gray-800 dark:text-gray-200 
                         rounded border border-gray-300 dark:border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Başlık"
              />
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full h-32 px-3 py-2 bg-gray-50 dark:bg-gray-700 
                         text-gray-800 dark:text-gray-200 
                         rounded border border-gray-300 dark:border-gray-600 
                         focus:outline-none focus:ring-2 focus:ring-red-500 
                         resize-none mb-4"
                placeholder="Not içeriği"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingNote(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 
                           hover:text-gray-800 dark:hover:text-gray-200 
                           transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-red-600 dark:bg-red-700 
                           text-white rounded hover:bg-red-700 
                           dark:hover:bg-red-800 transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </div>
          ) : (
            // Not Görünümü
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medieval text-gray-800 dark:text-gray-200">
                  {note.title}
                </h3>
                <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {note.text}
              </p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                {new Date(note.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          )}
        </div>
      ))}

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
  );
}

export default NoteList;