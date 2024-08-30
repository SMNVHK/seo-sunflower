import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  read: boolean;
  timestamp: number;
}

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.timestamp - a.timestamp,
});

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    addNotification: notificationsAdapter.addOne,
    removeNotification: notificationsAdapter.removeOne,
    markAsRead: (state, action: PayloadAction<string>) => {
      notificationsAdapter.updateOne(state, { id: action.payload, changes: { read: true } });
    },
    clearAllNotifications: notificationsAdapter.removeAll,
  },
});

export const { addNotification, removeNotification, markAsRead, clearAllNotifications } = notificationSlice.actions;

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationIds,
} = notificationsAdapter.getSelectors((state: RootState) => state.notifications);

export default notificationSlice.reducer;