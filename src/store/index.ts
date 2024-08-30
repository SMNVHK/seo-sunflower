import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import seoReducer from './seoSlice';
import siteAnalysisReducer from './siteAnalysisSlice';
import keywordReducer from './keywordSlice';
import competitorReducer from './competitorSlice';
import notificationReducer from './notificationSlice';
import chatReducer from './chatSlice';
import { notificationSaga } from './notificationSaga';
import { chatSaga } from './chatSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    notificationSaga(),
    chatSaga(),
  ]);
}

export const store = configureStore({
  reducer: {
    seo: seoReducer,
    siteAnalysis: siteAnalysisReducer,
    keywords: keywordReducer,
    competitors: competitorReducer,
    notifications: notificationReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;