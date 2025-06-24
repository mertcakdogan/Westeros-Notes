import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notes/notesSlice';
import { notesApi } from './api/notesApi';
import themeReducer from './theme/themeSlice';

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        [notesApi.reducerPath]: notesApi.reducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(notesApi.middleware),
});