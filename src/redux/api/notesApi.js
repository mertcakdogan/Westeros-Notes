import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Note'],
  endpoints: (builder) => ({
    // Tüm notları getir
    getNotes: builder.query({
      query: () => 'notes',
      providesTags: ['Note'],
    }),
    
    // Tek not getir
    getNote: builder.query({
      query: (id) => `notes/${id}`,
      providesTags: (result, error, id) => [{ type: 'Note', id }],
    }),
    
    // Yeni not ekle
    addNote: builder.mutation({
      query: (newNote) => ({
        url: 'notes',
        method: 'POST',
        body: newNote,
      }),
      invalidatesTags: ['Note'],
    }),
    
    // Not düzenle
    updateNote: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `notes/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Note', id },
        'Note'
      ],
    }),
    
    // Not sil
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
    
    // Not ara
    searchNotes: builder.query({
      query: (searchTerm) => `notes/search?q=${encodeURIComponent(searchTerm)}`,
      providesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useSearchNotesQuery,
} = notesApi; 