import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

const Notifications = () => {
  const { notifications, markAsRead, dismissNotification } = useNotifications();

  return (
    <div className="relative">
      <Bell className="h-6 w-6 cursor-pointer" />
      {notifications.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {notifications.length}
        </span>
      )}
      <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.map((notif) => (
              <div key={notif.id} className="mb-2 p-2 bg-gray-100 rounded">
                <p>{notif.message}</p>
                <div className="flex justify-end mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(notif.id)}
                    className="mr-2"
                  >
                    Mark as Read
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dismissNotification(notif.id)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;