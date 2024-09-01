import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const DynamicDashboard = dynamic(() => import('../components/Dashboard'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">SEO Tool Dashboard</h1>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <DynamicDashboard />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <Link href="/site-analyzer">
          <Button className="w-full">Site Analyzer</Button>
        </Link>
        <Link href="/keywords">
          <Button className="w-full">Keyword Tracker</Button>
        </Link>
        <Link href="/content">
          <Button className="w-full">Content Optimizer</Button>
        </Link>
        <Link href="/competitors">
          <Button className="w-full">Competitor Analysis</Button>
        </Link>
        <Link href="/reports">
          <Button className="w-full">Reports & Insights</Button>
        </Link>
        <Link href="/settings">
          <Button className="w-full">Settings</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
