import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [searchConsoleVerified, setSearchConsoleVerified] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSaveSettings = () => {
    // Logic to save settings
    console.log('Saving settings:', {
      googleAnalyticsId,
      searchConsoleVerified,
      emailNotifications,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Integrations & Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="ga-id" className="block text-sm font-medium text-gray-700">
                Google Analytics ID
              </label>
              <Input
                id="ga-id"
                value={googleAnalyticsId}
                onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                placeholder="UA-XXXXXXXXX-X"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Google Search Console Verified</span>
              <Switch
                checked={searchConsoleVerified}
                onCheckedChange={setSearchConsoleVerified}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Email Notifications</span>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;