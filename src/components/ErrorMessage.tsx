import './ErrorMessage.css';

interface ErrorMessageProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ title = 'Error', message, retry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <div className="error-icon">⚠</div>
      <h4 className="error-title">{title}</h4>
      <p className="error-text">{message}</p>
      {retry && (
        <button onClick={retry} className="error-retry">
          Try Again
        </button>
      )}
    </div>
  );
}
