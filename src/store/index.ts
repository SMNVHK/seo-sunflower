import { configureStore } from '@reduxjs/toolkit';
import seoReducer from './seoSlice';

export const store = configureStore({
  reducer: {
    seo: seoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;