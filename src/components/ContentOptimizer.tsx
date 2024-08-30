import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { debounce } from 'lodash';

// Mock API calls - replace with actual API calls when ready
const analyzeContent = async (content: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const words = content.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const keywordDensity = (words.filter(word => word.toLowerCase() === 'seo').length / wordCount) * 100;
  const readabilityScore = Math.floor(Math.random() * 40) + 60; // Random score between 60-100
  const seoScore = Math.floor((keywordDensity * 10 + readabilityScore) / 2);

  return {
    keywordDensity,
    readabilityScore,
    seoScore,
    wordCount,
    suggestions: [
      keywordDensity < 1 ? 'Consider adding more relevant keywords' : 'Keyword density is good',
      readabilityScore < 70 ? 'Try to improve readability by using shorter sentences and simpler words' : 'Readability is good',
      wordCount < 300 ? 'Try to increase the word count for better SEO performance' : 'Word count is sufficient',
    ],
  };
};

const getSerpPreview = async (content: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const words = content.split(/\s+/).slice(0, 20).join(' ');
  return {
    title: words.length > 60 ? words.slice(0, 60) + '...' : words,
    description: content.length > 160 ? content.slice(0, 160) + '...' : content,
    url: 'https://example.com/' + words.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
  };
};

const ContentOptimizer: React.FC = () => {
  const [content, setContent] = useState('');
  const [debouncedContent, setDebouncedContent] = useState('');

  const debouncedSetContent = useCallback(
    debounce((value) => setDebouncedContent(value), 500),
    []
  );

  useEffect(() => {
    debouncedSetContent(content);
  }, [content, debouncedSetContent]);

  const { data: analysisData, isLoading: isAnalysisLoading, isError: isAnalysisError, error: analysisError } = useQuery(
    ['contentAnalysis', debouncedContent],
    () => analyzeContent(debouncedContent),
    { enabled: debouncedContent.length > 0 }
  );

  const { data: serpData, isLoading: isSerpLoading, isError: isSerpError, error: serpError } = useQuery(
    ['serpPreview', debouncedContent],
    () => getSerpPreview(debouncedContent),
    { enabled: debouncedContent.length > 0 }
  );

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
            onChange={handleContentChange}
            rows={10}
            className="mb-4"
          />
        </CardContent>
      </Card>

      {(isAnalysisError || isSerpError) && (
        <Alert variant="destructive">
          <AlertDescription>
            {(analysisError instanceof Error && analysisError.message) || 
             (serpError instanceof Error && serpError.message) || 
             'An error occurred during analysis'}
          </AlertDescription>
        </Alert>
      )}

      {(isAnalysisLoading || isSerpLoading) && (
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

      {analysisData && (
        <Card>
          <CardHeader>
            <CardTitle>Content Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Keyword Density: {analysisData.keywordDensity.toFixed(2)}%</h3>
                <Progress value={analysisData.keywordDensity * 33.33} className="h-2" />
                <p className="text-sm text-gray-500">Aim for a keyword density between 1-3%</p>
              </div>
              <div>
                <h3 className="font-semibold">Readability Score: {analysisData.readabilityScore}/100</h3>
                <Progress value={analysisData.readabilityScore} className="h-2" />
                <p className="text-sm text-gray-500">A score above 60 is considered good</p>
              </div>
              <div>
                <h3 className="font-semibold">SEO Score: {analysisData.seoScore}/100</h3>
                <Progress value={analysisData.seoScore} className="h-2" />
                <p className="text-sm text-gray-500">Aim for a score above 80 for best results</p>
              </div>
              <div>
                <h3 className="font-semibold">Word Count: {analysisData.wordCount}</h3>
                <p className="text-sm text-gray-500">Aim for at least 300 words for most content</p>
              </div>
              <div>
                <h3 className="font-semibold">Suggestions:</h3>
                <ul className="list-disc list-inside">
                  {analysisData.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm">{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {serpData && (
        <Card>
          <CardHeader>
            <CardTitle>SERP Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="text-blue-600 text-xl">{serpData.title}</h3>
              <p className="text-green-700 text-sm">{serpData.url}</p>
              <p className="text-sm">{serpData.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentOptimizer;
