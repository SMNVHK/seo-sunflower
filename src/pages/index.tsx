import type { NextPage } from 'next';
import Dashboard from '../components/Dashboard';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">SEO Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default Home;