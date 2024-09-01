import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const ReportsAndInsights = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const metrics = [
    'Organic Traffic',
    'Keyword Rankings',
    'Backlinks',
    'Page Speed',
    'Mobile Usability',
    'Core Web Vitals',
  ];

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const generateReport = () => {
    // Logic to generate report based on selectedMetrics
    console.log('Generating report for:', selectedMetrics);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reports & Insights</h1>
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Metrics:</h3>
              {metrics.map(metric => (
                <div key={metric} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric}
                    checked={selectedMetrics.includes(metric)}
                    onCheckedChange={() => handleMetricToggle(metric)}
                  />
                  <label htmlFor={metric}>{metric}</label>
                </div>
              ))}
            </div>
            <Button onClick={generateReport} disabled={selectedMetrics.length === 0}>
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Add AI Insights component here */}
    </div>
  );
};

export default ReportsAndInsights;