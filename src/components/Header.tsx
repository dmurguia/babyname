import { useHealth } from '@/hooks/useApi';
import { Badge } from './Badge';
import './Header.css';

const USE_MOCK_DATA = !import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL === 'https://your-backend-url';

export function Header() {
  const { data: health, isLoading } = useHealth();

  const getStatusVariant = () => {
    if (USE_MOCK_DATA) return 'warning';
    if (isLoading) return 'warning';
    return 'success';
  };

  const getStatusText = () => {
    if (USE_MOCK_DATA) return 'Demo Mode';
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
