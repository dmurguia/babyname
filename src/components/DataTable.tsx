import { formatNumber } from '@/lib/utils';
import './DataTable.css';

interface DataTableProps {
  data: Record<string, unknown>[];
}

export function DataTable({ data }: DataTableProps) {
  if (data.length === 0) {
    return <div className="table-empty">No data available</div>;
  }

  const columns = Object.keys(data[0]);

  const formatValue = (value: unknown): string => {
    if (typeof value === 'number') {
      return formatNumber(value);
    }
    return String(value ?? '');
  };

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                {column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
              {columns.map((column) => (
                <td key={column}>{formatValue(row[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
