import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

// Mock API call - replace with actual API call when ready
const analyzeContent = async (content: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    keywordDensity: 2.5,
    readabilityScore: 75,
    seoScore: 85,
    suggestions: [
      'Consider adding more relevant keywords',
      'Your content is well-structured',
      'Try to increase the word count for better SEO performance',
    ],
  };
};

const ContentOptimizer: React.FC = () => {
  const [content, setContent] = useState('');
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['contentAnalysis', content],
    () => analyzeContent(content),
    { enabled: false }
  );

  const handleAnalyze = () => {
    if (content) refetch();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Optimizer</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="mb-4"
          />
          <Button onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze Content'}
          </Button>
        </CardContent>
      </Card>

      {isError && (
        <Alert variant="destructive">
          <AlertDescription>
            {error instanceof Error ? error.message : 'An error occurred during analysis'}
          </AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <Card>
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
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Keyword Density: {data.keywordDensity}%</h3>
                <p>Aim for a keyword density between 1-3%</p>
              </div>
              <div>
                <h3 className="font-semibold">Readability Score: {data.readabilityScore}/100</h3>
                <p>A score above 60 is considered good</p>
              </div>
              <div>
                <h3 className="font-semibold">SEO Score: {data.seoScore}/100</h3>
                <p>Aim for a score above 80 for best results</p>
              </div>
              <div>
                <h3 className="font-semibold">Suggestions:</h3>
                <ul className="list-disc list-inside">
                  {data.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentOptimizer;