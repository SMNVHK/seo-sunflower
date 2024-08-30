import { configureStore } from '@reduxjs/toolkit';
import seoReducer from './seoSlice';
import siteAnalysisReducer from './siteAnalysisSlice';

export const store = configureStore({
  reducer: {
    seo: seoReducer,
    siteAnalysis: siteAnalysisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
