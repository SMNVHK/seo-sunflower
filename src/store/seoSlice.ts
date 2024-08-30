import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SEOMetric {
  value: number;
  change: number;
}

interface SEOState {
  organicTraffic: SEOMetric;
  averagePosition: SEOMetric;
  clickThroughRate: SEOMetric;
  keywordsRanking: SEOMetric;
  trendData: {
    date: string;
    organicTraffic: number;
    averagePosition: number;
    clickThroughRate: number;
  }[];
  alerts: { id: string; message: string; type: 'info' | 'warning' | 'error' }[];
  tasks: { id: string; task: string; impact: 'high' | 'medium' | 'low' }[];
}

const initialState: SEOState = {
  organicTraffic: { value: 0, change: 0 },
  averagePosition: { value: 0, change: 0 },
  clickThroughRate: { value: 0, change: 0 },
  keywordsRanking: { value: 0, change: 0 },
  trendData: [],
  alerts: [],
  tasks: [],
};

const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {
    updateSEOMetrics(state, action: PayloadAction<Partial<SEOState>>) {
      return { ...state, ...action.payload };
    },
    addAlert(state, action: PayloadAction<SEOState['alerts'][0]>) {
      state.alerts.push(action.payload);
    },
    removeAlert(state, action: PayloadAction<string>) {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    addTask(state, action: PayloadAction<SEOState['tasks'][0]>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { updateSEOMetrics, addAlert, removeAlert, addTask, removeTask } = seoSlice.actions;
export default seoSlice.reducer;
