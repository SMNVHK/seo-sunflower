import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SEOState {
  organicTraffic: number;
  averagePosition: number;
  keywordsRanking: number;
}

const initialState: SEOState = {
  organicTraffic: 0,
  averagePosition: 0,
  keywordsRanking: 0,
};

const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {
    updateSEOMetrics(state, action: PayloadAction<SEOState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSEOMetrics } = seoSlice.actions;
export default seoSlice.reducer;