import { useState } from 'react';
import { useSavedQueries, useCreateSavedQuery, useDeleteSavedQuery } from '@/hooks/useApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Button } from './Button';
import { Input } from './Input';
import { EmptyState } from './EmptyState';
import { Spinner } from './Spinner';
import { ErrorMessage } from './ErrorMessage';
import { formatDate } from '@/lib/utils';
import './SavedQueries.css';

interface SavedQueriesProps {
  onRunQuery?: (prompt: string) => void;
}

export function SavedQueries({ onRunQuery }: SavedQueriesProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [localTitles, setLocalTitles] = useLocalStorage<Record<number, string>>(
    'savedQueryTitles',
    {}
  );

  const { data: queries, isLoading, error, refetch } = useSavedQueries();
  const createMutation = useCreateSavedQuery();
  const deleteMutation = useDeleteSavedQuery();

  const handleCreate = async () => {
    if (!newPrompt.trim()) return;

    await createMutation.mutateAsync({
      prompt: newPrompt.trim(),
      title: newTitle.trim() || undefined,
    });

    setNewPrompt('');
    setNewTitle('');
    setShowAddForm(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this saved query?')) {
      await deleteMutation.mutateAsync(id);
      const newTitles = { ...localTitles };
      delete newTitles[id];
      setLocalTitles(newTitles);
    }
  };

  const handleRun = (prompt: string) => {
    onRunQuery?.(prompt);
  };

  const getDisplayTitle = (id: number, title?: string, prompt?: string) => {
    return localTitles[id] || title || prompt?.substring(0, 50) || 'Untitled Query';
  };

  if (isLoading) {
    return (
      <Card>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Spinner />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <ErrorMessage message={error.message} retry={() => refetch()} />
      </Card>
    );
  }

  return (
    <Card className="saved-queries">
      <CardHeader>
        <div className="saved-queries-header">
          <CardTitle>Saved Queries</CardTitle>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showAddForm && (
          <div className="add-query-form">
            <Input
              placeholder="Query prompt..."
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
            />
            <Input
              placeholder="Optional title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button
              onClick={handleCreate}
              isLoading={createMutation.isPending}
              disabled={!newPrompt.trim()}
            >
              Save Query
            </Button>
          </div>
        )}

        {queries && queries.length === 0 ? (
          <EmptyState
            icon="💾"
            title="No Saved Queries"
            description="Save your favorite queries for quick access"
          />
        ) : (
          <div className="queries-list">
            {queries?.map((query, index) => (
              <div
                key={query.id}
                className="query-item animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="query-content">
                  <h4 className="query-title">
                    {getDisplayTitle(query.id, query.title, query.prompt)}
                  </h4>
                  <p className="query-prompt">{query.prompt}</p>
                  <span className="query-date">{formatDate(query.created_at)}</span>
                </div>
                <div className="query-actions">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRun(query.prompt)}
                  >
                    Run
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(query.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
