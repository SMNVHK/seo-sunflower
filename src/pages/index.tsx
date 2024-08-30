import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const DynamicDashboard = dynamic(() => import('../components/Dashboard'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">SEO Dashboard</h1>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <DynamicDashboard />
      </Suspense>
    </div>
  );
};

export default Home;