import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header />
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
