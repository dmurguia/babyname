import { useState } from 'react';
import { useChatQuery } from '@/hooks/useApi';
import { Button } from './Button';
import { Textarea } from './Textarea';
import { Card } from './Card';
import { ErrorMessage } from './ErrorMessage';
import './ChatInterface.css';

const EXAMPLE_PROMPTS = [
  'What are the top 10 names in the 2010s?',
  'Show me the popularity trend of Emma',
  'Which names were popular in the 1950s?',
  'Compare Michael and Christopher over time',
];

interface ChatInterfaceProps {
  onResult?: (data: unknown) => void;
}

export function ChatInterface({ onResult }: ChatInterfaceProps) {
  const [query, setQuery] = useState('');
  const chatMutation = useChatQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const result = await chatMutation.mutateAsync({ query });
    onResult?.(result);
  };

  const handleExampleClick = (prompt: string) => {
    setQuery(prompt);
  };

  return (
    <div className="chat-interface">
      <form onSubmit={handleSubmit} className="chat-form">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything about baby name trends..."
          rows={4}
        />
        <Button type="submit" isLoading={chatMutation.isPending} disabled={!query.trim()}>
          Ask Question
        </Button>
      </form>

      <div className="example-prompts">
        <p className="example-prompts-label">Try these examples:</p>
        <div className="example-prompts-grid">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              className="example-prompt-chip"
              onClick={() => handleExampleClick(prompt)}
              type="button"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {chatMutation.isError && (
        <ErrorMessage
          message={chatMutation.error.message}
          retry={() => chatMutation.mutate({ query })}
        />
      )}

      {chatMutation.isSuccess && chatMutation.data && (
        <Card className="chat-response animate-slide-up">
          <div className="chat-answer">
            <h4 className="chat-answer-title">Answer</h4>
            <p className="chat-answer-text">{chatMutation.data.answer}</p>
          </div>
          {chatMutation.data.structured_result?.summary && (
            <div className="chat-summary">
              <strong>Summary:</strong> {chatMutation.data.structured_result.summary}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
