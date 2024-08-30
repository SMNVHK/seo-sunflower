import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const DynamicDashboard = dynamic(() => import('../components/Dashboard'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicKeywordTracker = dynamic(() => import('../components/KeywordTracker'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicContentOptimizer = dynamic(() => import('../components/ContentOptimizer'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const DynamicCompetitorAnalysis = dynamic(() => import('../components/CompetitorAnalysis'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const DemoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">SEO Tool Demo</h1>
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <DynamicDashboard />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Keyword Tracker</h2>
          <DynamicKeywordTracker />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Content Optimizer</h2>
          <DynamicContentOptimizer />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Competitor Analysis</h2>
          <DynamicCompetitorAnalysis />
        </section>
      </div>
    </div>
  );
};

export default DemoPage;