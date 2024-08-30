import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Competitor {
  url: string;
  data: {
    domainAuthority: number;
    pageSpeed: number;
    backlinkCount: number;
    keywordRankings: number;
  };
}

interface CompetitorState {
  competitors: Competitor[];
  loading: boolean;
  error: string | null;
}

const initialState: CompetitorState = {
  competitors: [],
  loading: false,
  error: null,
};

const competitorSlice = createSlice({
  name: 'competitors',
  initialState,
  reducers: {
    addCompetitor(state, action: PayloadAction<string>) {
      if (state.competitors.length < 3) {
        state.competitors.push({ url: action.payload, data: { domainAuthority: 0, pageSpeed: 0, backlinkCount: 0, keywordRankings: 0 } });
      }
    },
    removeCompetitor(state, action: PayloadAction<string>) {
      state.competitors = state.competitors.filter(competitor => competitor.url !== action.payload);
    },
    updateCompetitorData(state, action: PayloadAction<{ url: string; data: Competitor['data'] }>) {
      const competitor = state.competitors.find(c => c.url === action.payload.url);
      if (competitor) {
        competitor.data = action.payload.data;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { addCompetitor, removeCompetitor, updateCompetitorData, setLoading, setError } = competitorSlice.actions;
export default competitorSlice.reducer;