import { createSlice, nanoid } from '@reduxjs/toolkit';

// Başlangıç state'ini tanımlıyoruz.
const initialState = {
    // Tüm notların tutulacağı dizi
    items: [
        { id: nanoid(), text: 'Note 1', color: '#FDE24F' }, // Sarı
        { id: nanoid(), text: 'Note 2', color: '#87CEEB' }, // Mavi
        { id: nanoid(), text: 'Note 3', color: '#90EE90' }, // Yeşil
    ],
    // Yeni not eklerken seçili olan aktif renk
    activeColor: '#90EE90', // Başlangıçta yeşil seçili olsun
    // Arama input'una girilen metin
    searchTerm: '',
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // Yeni not eklemek için reducer
        addNote: {
            reducer: (state, action) => {
                state.items.unshift(action.payload); // Yeni notu listenin başına ekle
            },
            // addNote action'ı çağrıldığında payload'ı hazırlayan fonksiyon
            prepare: ({ text }) => {
                return {
                    payload: {
                        id: nanoid(), // Benzersiz bir ID oluştur
                        text,
                        color: initialState.activeColor, // O anki aktif rengi kullan
                    },
                };
            },
        },
        // Arama terimini güncellemek için reducer
        changeSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        // Aktif rengi değiştirmek için reducer
        changeActiveColor: (state, action) => {
            state.activeColor = action.payload;
        },
        // Not silmek için (isteğe bağlı ekledim)
        destroyNote: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id);
            state.items = filtered;
        },
    },
});

// Selector'ler: State'ten veri çekmeyi kolaylaştırır.
export const selectNotes = (state) => state.notes.items;
export const selectActiveColor = (state) => state.notes.activeColor;
export const selectSearchTerm = (state) => state.notes.searchTerm;

// Filtrelenmiş notları döndüren selector
export const selectFilteredNotes = (state) => {
    const notes = selectNotes(state);
    const searchTerm = selectSearchTerm(state);
    
    if (searchTerm === '') {
        return notes;
    }
    
    return notes.filter((note) => 
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
};


// Action'ları dışa aktar
export const { addNote, changeSearchTerm, changeActiveColor, destroyNote } = notesSlice.actions;

// Reducer'ı dışa aktar
export default notesSlice.reducer;