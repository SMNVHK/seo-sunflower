import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SiteAnalysisState {
  url: string;
  results: {
    loadingSpeed: string;
    mobileOptimized: boolean;
    sslSecured: boolean;
    structureIssues: string[];
  } | null;
}

const initialState: SiteAnalysisState = {
  url: '',
  results: null,
};

const siteAnalysisSlice = createSlice({
  name: 'siteAnalysis',
  initialState,
  reducers: {
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setResults(state, action: PayloadAction<SiteAnalysisState['results']>) {
      state.results = action.payload;
    },
    resetAnalysis(state) {
      state.url = '';
      state.results = null;
    },
  },
});

export const { setUrl, setResults, resetAnalysis } = siteAnalysisSlice.actions;
export default siteAnalysisSlice.reducer;