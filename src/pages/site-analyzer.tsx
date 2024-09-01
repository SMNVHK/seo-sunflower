import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const analyzeSite = async (url: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    loadingSpeed: '1.2s',
    mobileOptimized: true,
    sslSecured: true,
    structureIssues: ['Missing H1 tag', 'Duplicate meta descriptions'],
  };
};

const SiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['siteAnalysis', url],
    queryFn: () => analyzeSite(url),
    enabled: false,
  });

  const handleAnalyze = () => {
    if (url) refetch();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Site Analyzer</h1>
      <Card>
        <CardHeader>
          <CardTitle>Analyze Your Website</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="Enter website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAnalyze} disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isError && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'An error occurred during analysis'}
          </AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}

      {data && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Loading Speed: {data.loadingSpeed}</li>
              <li>Mobile Optimized: {data.mobileOptimized ? 'Yes' : 'No'}</li>
              <li>SSL Secured: {data.sslSecured ? 'Yes' : 'No'}</li>
              <li>
                Structure Issues:
                <ul className="list-disc list-inside pl-4">
                  {data.structureIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SiteAnalyzer;