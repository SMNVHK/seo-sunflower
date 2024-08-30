import type { NextPage } from 'next';
import Dashboard from '../components/Dashboard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSEOMetrics, addAlert, addTask } from '../store/seoSlice';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulating data fetching
    dispatch(updateSEOMetrics({
      organicTraffic: { value: 15000, change: 5 },
      averagePosition: { value: 12.5, change: -2 },
      clickThroughRate: { value: 3.2, change: 0.5 },
      keywordsRanking: { value: 250, change: 10 },
      trendData: [
        { date: '2023-01', organicTraffic: 10000, averagePosition: 15, clickThroughRate: 2.5 },
        { date: '2023-02', organicTraffic: 12000, averagePosition: 14, clickThroughRate: 2.7 },
        { date: '2023-03', organicTraffic: 13500, averagePosition: 13, clickThroughRate: 2.9 },
        { date: '2023-04', organicTraffic: 15000, averagePosition: 12.5, clickThroughRate: 3.2 },
      ],
    }));

    dispatch(addAlert({ id: '1', message: 'Significant increase in organic traffic detected', type: 'info' }));
    dispatch(addAlert({ id: '2', message: 'Several 404 errors found on your site', type: 'warning' }));

    dispatch(addTask({ id: '1', task: 'Optimize meta descriptions for top 10 pages', impact: 'high' }));
    dispatch(addTask({ id: '2', task: 'Fix broken links on product pages', impact: 'medium' }));
    dispatch(addTask({ id: '3', task: 'Improve page load speed for mobile devices', impact: 'high' }));
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">SEO Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default Home;
