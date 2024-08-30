import { configureStore } from '@reduxjs/toolkit';
import seoReducer from './seoSlice';
import siteAnalysisReducer from './siteAnalysisReducer';
import keywordReducer from './keywordSlice';
import competitorReducer from './competitorSlice';

export const store = configureStore({
  reducer: {
    seo: seoReducer,
    siteAnalysis: siteAnalysisReducer,
    keywords: keywordReducer,
    competitors: competitorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
