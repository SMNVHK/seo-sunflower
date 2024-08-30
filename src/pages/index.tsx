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
      <p className="mb-4">Welcome to our SEO tool. Here you can analyze your website's SEO performance, track keywords, optimize content, and more.</p>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <DynamicDashboard />
      </Suspense>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
        <div className="space-y-2">
          <Link href="/keywords">
            <Button className="w-full">Keyword Tracker</Button>
          </Link>
          <Link href="/content">
            <Button className="w-full">Content Optimizer</Button>
          </Link>
          <Link href="/competitors">
            <Button className="w-full">Competitor Analysis</Button>
          </Link>
          <Link href="/demo">
            <Button className="w-full">View Demo</Button>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the navigation menu to explore different features of the tool.</li>
          <li>The Dashboard provides an overview of your SEO performance.</li>
          <li>Keyword Tracker helps you monitor your target keywords' rankings.</li>
          <li>Content Optimizer suggests improvements for your content.</li>
          <li>Competitor Analysis allows you to compare your site with competitors.</li>
          <li>Visit the Demo page to see all components in action.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
