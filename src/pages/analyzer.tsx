import type { NextPage } from 'next';
import SiteAnalyzer from '../components/SiteAnalyzer';

const AnalyzerPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Site Analyzer</h1>
      <SiteAnalyzer />
    </div>
  );
};

export default AnalyzerPage;