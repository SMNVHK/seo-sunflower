import { takeEvery, put } from 'redux-saga/effects';
import { addNotification } from './notificationSlice';

function* handleNewNotification(action) {
  yield put(addNotification({
    id: Date.now().toString(),
    message: action.payload.message,
    type: action.payload.type,
    read: false,
    timestamp: Date.now(),
  }));
}

export function* notificationSaga() {
  yield takeEvery('WEBSOCKET_NOTIFICATION', handleNewNotification);
}