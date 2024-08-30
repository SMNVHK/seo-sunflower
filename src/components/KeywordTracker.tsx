import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { addKeyword, removeKeyword, setFilter, setSort } from '../store/keywordSlice';
import { RootState } from '../store';

// Mock API call - replace with actual API call when ready
const fetchKeywords = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, keyword: 'SEO tools', position: 5, searchVolume: 10000, trend: 'improving' },
    { id: 2, keyword: 'Keyword research', position: 8, searchVolume: 8000, trend: 'stable' },
    { id: 3, keyword: 'Backlink analysis', position: 12, searchVolume: 5000, trend: 'declining' },
    // ... more keywords
  ];
};

const KeywordTracker: React.FC = () => {
  const dispatch = useDispatch();
  const { keywords, filter, sort } = useSelector((state: RootState) => state.keywords);
  const [newKeyword, setNewKeyword] = useState('');

  const { data, isLoading, isError, error } = useQuery(['keywords'], fetchKeywords);

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

  const KeywordRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const keyword = filteredAndSortedKeywords[index];
    return (
      <div style={style} className="flex items-center justify-between p-2 border-b">
        <span>{keyword.keyword}</span>
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
          <List
            height={400}
            itemCount={filteredAndSortedKeywords.length}
            itemSize={50}
            width="100%"
          >
            {KeywordRow}
          </List>
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
    </div>
  );
};

export default KeywordTracker;