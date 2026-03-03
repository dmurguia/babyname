import { useState } from 'react';
import { Card } from './Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { DataTable } from './DataTable';
import { DataChart } from './DataChart';
import { exportToCSV } from '@/lib/utils';
import './ResultsDisplay.css';

interface ResultsDisplayProps {
  data: unknown;
}

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState('summary');

  if (!data) {
    return (
      <Card>
        <EmptyState
          icon="📊"
          title="No Results Yet"
          description="Run a query or analysis to see results here"
        />
      </Card>
    );
  }

  const extractTableData = (): Record<string, unknown>[] => {
    if (typeof data === 'object' && data !== null) {
      if ('data' in data && Array.isArray((data as { data: unknown }).data)) {
        return (data as { data: Record<string, unknown>[] }).data;
      }
      if (
        'structured_result' in data &&
        typeof (data as { structured_result?: unknown }).structured_result === 'object' &&
        (data as { structured_result?: { chart_data?: unknown } }).structured_result
          ?.chart_data &&
        Array.isArray(
          (data as { structured_result: { chart_data: unknown } }).structured_result.chart_data
        )
      ) {
        return (data as { structured_result: { chart_data: Record<string, unknown>[] } })
          .structured_result.chart_data;
      }
    }
    return [];
  };

  const extractSummary = (): string => {
    if (typeof data === 'object' && data !== null) {
      if ('summary' in data && typeof (data as { summary: unknown }).summary === 'string') {
        return (data as { summary: string }).summary;
      }
      if ('answer' in data && typeof (data as { answer: unknown }).answer === 'string') {
        return (data as { answer: string }).answer;
      }
    }
    return 'Analysis results are displayed below.';
  };

  const tableData = extractTableData();
  const summary = extractSummary();

  const handleExport = () => {
    if (tableData.length > 0) {
      exportToCSV(tableData, `babyname-results-${Date.now()}.csv`);
    }
  };

  return (
    <Card className="results-display">
      <div className="results-header">
        <h3>Results</h3>
        {tableData.length > 0 && (
          <Button size="sm" variant="secondary" onClick={handleExport}>
            Export CSV
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="summary" active={activeTab === 'summary'} onClick={() => setActiveTab('summary')}>
            Summary
          </TabsTrigger>
          {tableData.length > 0 && (
            <>
              <TabsTrigger value="table" active={activeTab === 'table'} onClick={() => setActiveTab('table')}>
                Table
              </TabsTrigger>
              <TabsTrigger value="chart" active={activeTab === 'chart'} onClick={() => setActiveTab('chart')}>
                Chart
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="json" active={activeTab === 'json'} onClick={() => setActiveTab('json')}>
            JSON
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" activeValue={activeTab}>
          <div className="summary-content">
            <p>{summary}</p>
          </div>
        </TabsContent>

        {tableData.length > 0 && (
          <>
            <TabsContent value="table" activeValue={activeTab}>
              <DataTable data={tableData} />
            </TabsContent>

            <TabsContent value="chart" activeValue={activeTab}>
              <DataChart data={tableData} />
            </TabsContent>
          </>
        )}

        <TabsContent value="json" activeValue={activeTab}>
          <pre className="json-content">{JSON.stringify(data, null, 2)}</pre>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
