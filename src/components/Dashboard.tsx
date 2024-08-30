import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', traffic: 4000, position: 24 },
  { name: 'Feb', traffic: 3000, position: 13 },
  { name: 'Mar', traffic: 2000, position: 9 },
  { name: 'Apr', traffic: 2780, position: 3 },
  { name: 'May', traffic: 1890, position: 4 },
  { name: 'Jun', traffic: 2390, position: 3 },
  { name: 'Jul', traffic: 3490, position: 2 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Organic Traffic</h3>
          <p className="text-3xl font-bold">15,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Average Position</h3>
          <p className="text-3xl font-bold">12.5</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Keywords Ranking</h3>
          <p className="text-3xl font-bold">1,250</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">SEO Performance Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="traffic" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="position" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Priority SEO Tasks</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
            <span>Optimize meta descriptions for top 10 pages</span>
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
            <span>Improve page load speed for mobile devices</span>
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            <span>Update internal linking structure</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;