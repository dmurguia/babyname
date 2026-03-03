import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './DataChart.css';

interface DataChartProps {
  data: Record<string, unknown>[];
}

export function DataChart({ data }: DataChartProps) {
  if (data.length === 0) {
    return <div className="chart-empty">No data to visualize</div>;
  }

  const hasYearField = 'year' in data[0];
  const hasDecadeField = 'decade' in data[0];
  const hasCountField = 'count' in data[0];
  const hasRankField = 'rank' in data[0];

  const xKey = hasYearField ? 'year' : hasDecadeField ? 'decade' : Object.keys(data[0])[0];

  if (hasYearField) {
    return (
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
            <XAxis
              dataKey={xKey}
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: '#2a3f5f', fontSize: 12 }}
            />
            <YAxis tick={{ fill: '#2a3f5f', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #d4eded',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            {hasCountField && (
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3d8b8a"
                strokeWidth={3}
                name="Count"
              />
            )}
            {hasRankField && (
              <Line type="monotone" dataKey="rank" stroke="#7cbdbc" strokeWidth={2} name="Rank" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
          <XAxis
            dataKey={xKey}
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: '#2a3f5f', fontSize: 12 }}
          />
          <YAxis tick={{ fill: '#2a3f5f', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #d4eded',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {hasCountField && <Bar dataKey="count" fill="#3d8b8a" name="Count" />}
          {hasRankField && <Bar dataKey="rank" fill="#7cbdbc" name="Rank" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
