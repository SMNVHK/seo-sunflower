import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { addKeyword, removeKeyword, setFilter, setSort, setSelectedKeyword } from '../store/keywordSlice';
import { RootState } from '../store';

// Mock API calls - replace with actual API calls when ready
const fetchKeywords = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, keyword: 'SEO tools', position: 5, searchVolume: 10000, trend: 'improving' },
    { id: 2, keyword: 'Keyword research', position: 8, searchVolume: 8000, trend: 'stable' },
    { id: 3, keyword: 'Backlink analysis', position: 12, searchVolume: 5000, trend: 'declining' },
    // ... more keywords
  ];
};

const fetchRelatedKeywords = async (keyword) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { keyword: `${keyword} software`, searchVolume: 5000 },
    { keyword: `best ${keyword}`, searchVolume: 3000 },
    { keyword: `${keyword} tutorial`, searchVolume: 2000 },
  ];
};

const fetchSerpPreview = async (keyword) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    title: `Best ${keyword} - Top Results`,
    description: `Find the best ${keyword} with our comprehensive guide. Compare features, prices, and user reviews.`,
    url: `https://example.com/best-${keyword.replace(' ', '-')}`,
  };
};

const KeywordTracker: React.FC = () => {
  const dispatch = useDispatch();
  const { keywords, filter, sort, selectedKeyword } = useSelector((state: RootState) => state.keywords);
  const [newKeyword, setNewKeyword] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['keywords'],
    queryFn: fetchKeywords,
  });
  const { data: relatedKeywords } = useQuery({
    queryKey: ['relatedKeywords', selectedKeyword],
    queryFn: () => fetchRelatedKeywords(selectedKeyword),
    enabled: !!selectedKeyword,
  });
  const { data: serpPreview } = useQuery({
    queryKey: ['serpPreview', selectedKeyword],
    queryFn: () => fetchSerpPreview(selectedKeyword),
    enabled: !!selectedKeyword,
  });

  const filteredAndSortedKeywords = useMemo(() => {
    let result = [...keywords];
    if (filter) {
      result = result.filter(keyword => keyword.trend === filter);
    }
    if (sort) {
      result.sort((a, b) => {
        if (sort === 'position') return a.position - b.position;
        if (sort === 'volume') return b.searchVolume - a.searchVolume;
        return 0;
      });
    }
    return result;
  }, [keywords, filter, sort]);

  const handleAddKeyword = () => {
    if (newKeyword) {
      dispatch(addKeyword({ id: Date.now(), keyword: newKeyword, position: 0, searchVolume: 0, trend: 'new' }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (id: number) => {
    dispatch(removeKeyword(id));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort(event.target.value));
  };

  const handleKeywordSelect = (keyword: string) => {
    dispatch(setSelectedKeyword(keyword));
  };

  const KeywordRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const keyword = filteredAndSortedKeywords[index];
    return (
      <div style={style} className="flex items-center justify-between p-2 border-b">
        <span className="cursor-pointer" onClick={() => handleKeywordSelect(keyword.keyword)}>{keyword.keyword}</span>
        <span>Position: {keyword.position}</span>
        <span>Volume: {keyword.searchVolume}</span>
        <span>Trend: {keyword.trend}</span>
        <Button onClick={() => handleRemoveKeyword(keyword.id)} variant="destructive" size="sm">Remove</Button>
      </div>
    );
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error instanceof Error ? error.message : 'An error occurred while fetching keywords'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Keyword Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter new keyword"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAddKeyword}>Add Keyword</Button>
          </div>
          <div className="flex space-x-4 mb-4">
            <Select onValueChange={handleFilterChange}>
              <option value="">All Trends</option>
              <option value="improving">Improving</option>
              <option value="stable">Stable</option>
              <option value="declining">Declining</option>
            </Select>
            <Select onValueChange={handleSortChange}>
              <option value="">Sort By</option>
              <option value="position">Position</option>
              <option value="volume">Search Volume</option>
            </Select>
          </div>
          <div style={{ height: 400 }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  itemCount={filteredAndSortedKeywords.length}
                  itemSize={50}
                  width={width}
                >
                  {KeywordRow}
                </List>
              )}
            </AutoSizer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Keyword Position Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredAndSortedKeywords}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="keyword" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="position" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keyword Clustering</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="searchVolume" name="Search Volume" />
              <YAxis type="number" dataKey="position" name="Position" />
              <ZAxis type="number" dataKey="id" range={[50, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Keywords" data={filteredAndSortedKeywords} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {selectedKeyword && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>SERP Preview for "{selectedKeyword}"</CardTitle>
            </CardHeader>
            <CardContent>
              {serpPreview ? (
                <div className="space-y-2">
                  <h3 className="text-blue-600 text-xl">{serpPreview.title}</h3>
                  <p className="text-green-700">{serpPreview.url}</p>
                  <p>{serpPreview.description}</p>
                </div>
              ) : (
                <Skeleton className="h-24 w-full" />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Keywords for "{selectedKeyword}"</CardTitle>
            </CardHeader>
            <CardContent>
              {relatedKeywords ? (
                <ul className="space-y-2">
                  {relatedKeywords.map((related, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{related.keyword}</span>
                      <span>Volume: {related.searchVolume}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Skeleton className="h-24 w-full" />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default KeywordTracker;
