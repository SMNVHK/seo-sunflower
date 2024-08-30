import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Keyword {
  id: number;
  keyword: string;
  position: number;
  searchVolume: number;
  trend: string;
}

interface KeywordState {
  keywords: Keyword[];
  filter: string;
  sort: string;
}

const initialState: KeywordState = {
  keywords: [],
  filter: '',
  sort: '',
};

const keywordSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    addKeyword(state, action: PayloadAction<Keyword>) {
      state.keywords.push(action.payload);
    },
    removeKeyword(state, action: PayloadAction<number>) {
      state.keywords = state.keywords.filter(keyword => keyword.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    updateKeywords(state, action: PayloadAction<Keyword[]>) {
      state.keywords = action.payload;
    },
  },
});

export const { addKeyword, removeKeyword, setFilter, setSort, updateKeywords } = keywordSlice.actions;
export default keywordSlice.reducer;