import { useHealth } from '@/hooks/useApi';
import { Badge } from './Badge';
import './Header.css';

export function Header() {
  const { data: health, isLoading, error } = useHealth();

  const getStatusVariant = () => {
    if (error) return 'error';
    if (isLoading) return 'warning';
    return 'success';
  };

  const getStatusText = () => {
    if (error) return 'Offline';
    if (isLoading) return 'Connecting...';
    return 'Connected';
  };

  const getDatasetText = () => {
    if (!health?.dataset_info) return null;
    const { min_year, max_year } = health.dataset_info;
    return `Data: ${min_year}–${max_year}`;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand">
          <h1 className="header-title">BabyName Studio</h1>
          <p className="header-subtitle">Explore naming trends through data</p>
        </div>
        <div className="header-info">
          <Badge variant={getStatusVariant()}>{getStatusText()}</Badge>
          {getDatasetText() && <Badge variant="default">{getDatasetText()}</Badge>}
        </div>
      </div>
    </header>
  );
}
