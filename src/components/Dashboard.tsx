import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RootState } from '../store';
import { removeAlert, removeTask } from '../store/seoSlice';

const MetricCard: React.FC<{ title: string; value: number; change: number }> = ({ title, value, change }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
      </div>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { organicTraffic, averagePosition, clickThroughRate, keywordsRanking, trendData, alerts, tasks } = useSelector((state: RootState) => state.seo);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Organic Traffic" value={organicTraffic.value} change={organicTraffic.change} />
        <MetricCard title="Average Position" value={averagePosition.value} change={averagePosition.change} />
        <MetricCard title="Click-Through Rate" value={clickThroughRate.value} change={clickThroughRate.change} />
        <MetricCard title="Keywords Ranking" value={keywordsRanking.value} change={keywordsRanking.change} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SEO Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="organicTraffic" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="averagePosition" stroke="#82ca9d" />
              <Line yAxisId="left" type="monotone" dataKey="clickThroughRate" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type === 'error' ? 'destructive' : alert.type === 'warning' ? 'default' : 'info'}>
              <AlertTitle>{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
              <Button variant="outline" size="sm" onClick={() => dispatch(removeAlert(alert.id))}>Dismiss</Button>
            </Alert>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Priority Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between">
                <span>{task.task}</span>
                <div>
                  <span className={`mr-2 px-2 py-1 rounded text-xs ${
                    task.impact === 'high' ? 'bg-red-500 text-white' :
                    task.impact === 'medium' ? 'bg-yellow-500 text-black' :
                    'bg-green-500 text-white'
                  }`}>
                    {task.impact}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => dispatch(removeTask(task.id))}>Complete</Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;