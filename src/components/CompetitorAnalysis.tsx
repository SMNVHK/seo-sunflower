import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from '../store';
import { addCompetitor, removeCompetitor, updateCompetitorData } from '../store/competitorSlice';

const CompetitorAnalysis: React.FC = () => {
  const dispatch = useDispatch();
  const { competitors, loading, error } = useSelector((state: RootState) => state.competitors);
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('');

  const handleAddCompetitor = () => {
    if (newCompetitorUrl && competitors.length < 3) {
      dispatch(addCompetitor(newCompetitorUrl));
      setNewCompetitorUrl('');
    }
  };

  const handleRemoveCompetitor = (url: string) => {
    dispatch(removeCompetitor(url));
  };

  const overviewData = [
    { aspect: 'Domain Authority', A: 80, B: 70, C: 75, D: 85 },
    { aspect: 'Page Speed', A: 90, B: 85, C: 80, D: 88 },
    { aspect: 'Backlink Count', A: 1000, B: 800, C: 1200, D: 950 },
    { aspect: 'Keyword Rankings', A: 500, B: 450, C: 550, D: 480 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Competitor Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="url"
              placeholder="Enter competitor URL"
              value={newCompetitorUrl}
              onChange={(e) => setNewCompetitorUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAddCompetitor} disabled={competitors.length >= 3}>Add Competitor</Button>
          </div>
          {competitors.map((competitor) => (
            <div key={competitor.url} className="flex items-center justify-between mb-2">
              <span>{competitor.url}</span>
              <Button variant="destructive" size="sm" onClick={() => handleRemoveCompetitor(competitor.url)}>Remove</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {loading && <Skeleton className="h-96 w-full" />}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && (
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>SEO Aspect Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={overviewData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="aspect" />
                    <PolarRadiusAxis />
                    <Radar name="Your Site" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    {competitors.map((competitor, index) => (
                      <Radar
                        key={competitor.url}
                        name={`Competitor ${index + 1}`}
                        dataKey={String.fromCharCode(66 + index)}
                        stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                        fill={`#${Math.floor(Math.random()*16777215).toString(16)}`}
                        fillOpacity={0.6}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Your Ranking</TableHead>
                      {competitors.map((competitor, index) => (
                        <TableHead key={competitor.url}>Competitor {index + 1} Ranking</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Sample data - replace with actual data */}
                    <TableRow>
                      <TableCell>SEO Tools</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>7</TableCell>
                      <TableCell>4</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Keyword Research</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>3</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backlinks">
            <Card>
              <CardHeader>
                <CardTitle>Backlink Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Your Site</TableHead>
                      {competitors.map((competitor, index) => (
                        <TableHead key={competitor.url}>Competitor {index + 1}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Sample data - replace with actual data */}
                    <TableRow>
                      <TableCell>Total Backlinks</TableCell>
                      <TableCell>10,000</TableCell>
                      <TableCell>15,000</TableCell>
                      <TableCell>8,000</TableCell>
                      <TableCell>12,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Referring Domains</TableCell>
                      <TableCell>500</TableCell>
                      <TableCell>700</TableCell>
                      <TableCell>400</TableCell>
                      <TableCell>600</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Your Site</TableHead>
                      {competitors.map((competitor, index) => (
                        <TableHead key={competitor.url}>Competitor {index + 1}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Sample data - replace with actual data */}
                    <TableRow>
                      <TableCell>Avg. Content Length</TableCell>
                      <TableCell>1,500 words</TableCell>
                      <TableCell>2,000 words</TableCell>
                      <TableCell>1,200 words</TableCell>
                      <TableCell>1,800 words</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Readability Score</TableCell>
                      <TableCell>70</TableCell>
                      <TableCell>75</TableCell>
                      <TableCell>65</TableCell>
                      <TableCell>72</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CompetitorAnalysis;