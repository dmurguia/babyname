import { useState } from 'react';
import { useTopNamesByDecade, useNameTimeline } from '@/hooks/useApi';
import { Sex } from '@/lib/types';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import './AnalysisControls.css';

interface AnalysisControlsProps {
  onResult?: (data: unknown) => void;
}

const SEX_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
];

export function AnalysisControls({ onResult }: AnalysisControlsProps) {
  const [sex, setSex] = useState<Sex>('all');
  const [topN, setTopN] = useState(10);
  const [name, setName] = useState('');

  const topNamesMutation = useTopNamesByDecade();
  const timelineMutation = useNameTimeline();

  const handleTopNames = async () => {
    const result = await topNamesMutation.mutateAsync({ top_n: topN, sex });
    onResult?.(result);
  };

  const handleTimeline = async () => {
    if (!name.trim()) return;
    const result = await timelineMutation.mutateAsync({ name: name.trim(), sex });
    onResult?.(result);
  };

  return (
    <div className="analysis-controls">
      <Card>
        <CardHeader>
          <CardTitle>Analysis Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="control-group">
            <Select
              label="Gender"
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              options={SEX_OPTIONS}
            />

            <div className="slider-control">
              <label className="slider-label">
                Top Names: <strong>{topN}</strong>
              </label>
              <input
                type="range"
                min="5"
                max="20"
                value={topN}
                onChange={(e) => setTopN(Number(e.target.value))}
                className="slider"
              />
              <div className="slider-markers">
                <span>5</span>
                <span>20</span>
              </div>
            </div>

            <Button
              onClick={handleTopNames}
              isLoading={topNamesMutation.isPending}
              variant="primary"
            >
              Top Names by Decade
            </Button>
          </div>

          <div className="control-divider" />

          <div className="control-group">
            <Input
              label="Name for Timeline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emma"
            />

            <Button
              onClick={handleTimeline}
              isLoading={timelineMutation.isPending}
              variant="secondary"
              disabled={!name.trim()}
            >
              Name Timeline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
