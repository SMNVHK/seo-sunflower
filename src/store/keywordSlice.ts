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
  selectedKeyword: string | null;
}

const initialState: KeywordState = {
  keywords: [],
  filter: '',
  sort: '',
  selectedKeyword: null,
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
    setSelectedKeyword(state, action: PayloadAction<string | null>) {
      state.selectedKeyword = action.payload;
    },
  },
});

export const { addKeyword, removeKeyword, setFilter, setSort, updateKeywords, setSelectedKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;
